import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { PlanType, PlansConfig } from '../types/plan.type';
import { UsePlansActionsResult, PlanUpgradeApiResponse } from '@plan/interfaces';

export function usePlansActions<T extends PlansConfig = PlansConfig>(): UsePlansActionsResult<PlanType<T>> {
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  
  const upgradeFetcher = useFetcher<PlanUpgradeApiResponse>();

  // Handle plan change (callback-based)
  const handlePlanChange = useCallback((plan: PlanType<T>, callback?: (plan: PlanType<T>) => void) => {
    // Execute the callback if provided
    if (callback) {
      callback(plan);
    }
  }, []);

  // Handle plan upgrade (API call)
  const handlePlanUpgrade = useCallback(async (planType: PlanType<T>) => {
    return new Promise<void>((resolve, reject) => {
      setUpgradeLoading(true);

      const formData = new FormData();
      formData.append('type', planType as string);

      upgradeFetcher.submit(formData, {
        method: 'POST',
        action: '/api/billing/subscription'
      });

      // Store resolve/reject for use in useEffect
      (upgradeFetcher as any)._upgradePromise = { resolve, reject };
    });
  }, [upgradeFetcher]);

  // Handle upgrade fetcher state changes
  useEffect(() => {
    if (upgradeFetcher.state === 'loading') {
      setUpgradeLoading(true);
    }
    
    if (upgradeFetcher.state === 'idle') {
      setUpgradeLoading(false);
      const response = upgradeFetcher.data;
      const promise = (upgradeFetcher as any)._upgradePromise;
      
      if (!response) {
        if (promise) {
          promise.reject(new Error('No response received'));
          delete (upgradeFetcher as any)._upgradePromise;
        }
        return;
      }
      
      if (!response.success) {
        const errorMessage = response.error || 'Failed to upgrade plan';
        if (promise) {
          promise.reject(new Error(errorMessage));
          delete (upgradeFetcher as any)._upgradePromise;
        }
      } else if (response.data) {
        if (promise) {
          promise.resolve();
          delete (upgradeFetcher as any)._upgradePromise;
        }
      }
    }
  }, [upgradeFetcher.state, upgradeFetcher.data]);

  return {
    handlePlanChange,
    handlePlanUpgrade,
    upgradeLoading
  };
}
