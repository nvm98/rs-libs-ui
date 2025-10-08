import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { PlanType } from '../types/plan.type';

interface BillingData {
  currentPlan: PlanType;
}

interface BillingApiResponse {
  success: boolean;
  data?: BillingData;
  error?: string;
}

interface PlanUpgradeApiResponse {
  success: boolean;
  data?: { plan: PlanType };
  error?: string;
}

export interface UsePlansResult {
  selectedPlan: PlanType;
  isLoading: boolean;
  error: string | null;
  handlePlanChange: (plan: PlanType) => void;
  handlePlanUpgrade: (planType: PlanType) => Promise<void>;
  refreshBillingData: () => void;
}

export function usePlans(): UsePlansResult {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('free');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  
  const billingFetcher = useFetcher<BillingApiResponse>();
  const upgradeFetcher = useFetcher<PlanUpgradeApiResponse>();

  // Fetch billing data
  const fetchBillingData = useCallback(() => {
    setIsLoading(true);
    setError(null);
    billingFetcher.load('/api/billing');
  }, [billingFetcher]);

  // Handle plan change (local state only)
  const handlePlanChange = useCallback((plan: PlanType) => {
    setSelectedPlan(plan);
  }, []);

  // Handle plan upgrade (API call)
  const handlePlanUpgrade = useCallback(async (planType: PlanType) => {
    return new Promise<void>((resolve, reject) => {
      setUpgradeLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('planType', planType);
      
      upgradeFetcher.submit(formData, {
        method: 'POST',
        action: '/api/billing/subscription'
      });

      // Store resolve/reject for use in useEffect
      (upgradeFetcher as any)._upgradePromise = { resolve, reject };
    });
  }, [upgradeFetcher]);

  // Refresh billing data
  const refreshBillingData = useCallback(() => {
    fetchBillingData();
  }, [fetchBillingData]);

  // Handle billing data fetcher state changes
  useEffect(() => {
    if (billingFetcher.state === 'loading') {
      setIsLoading(true);
    }
    
    if (billingFetcher.state === 'idle') {
      setIsLoading(false);
      const response = billingFetcher.data;
      
      if (!response) {
        return;
      }
      
      if (!response.success) {
        setError(response.error || 'Failed to load billing data');
      } else if (response.data) {
        setSelectedPlan(response.data.currentPlan);
        setError(null);
      }
    }
  }, [billingFetcher.state, billingFetcher.data]);

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
        setError(errorMessage);
        if (promise) {
          promise.reject(new Error(errorMessage));
          delete (upgradeFetcher as any)._upgradePromise;
        }
      } else if (response.data) {
        setSelectedPlan(response.data.plan);
        setError(null);
        if (promise) {
          promise.resolve();
          delete (upgradeFetcher as any)._upgradePromise;
        }
      }
    }
  }, [upgradeFetcher.state, upgradeFetcher.data]);

  // Initial load
  useEffect(() => {
    fetchBillingData();
  }, [fetchBillingData]);

  return {
    selectedPlan,
    isLoading: isLoading || upgradeLoading,
    error,
    handlePlanChange,
    handlePlanUpgrade,
    refreshBillingData
  };
}
