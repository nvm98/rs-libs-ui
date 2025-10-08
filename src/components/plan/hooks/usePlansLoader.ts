import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { PlanType, PlansConfig } from '../types/plan.type';
import { UsePlansLoaderResult, BillingApiResponse } from '@plan/interfaces';

export function usePlansLoader<T extends PlansConfig = PlansConfig>(): UsePlansLoaderResult<PlanType<T>> {
  const [selectedPlan, setSelectedPlan] = useState<PlanType<T>>('free' as PlanType<T>);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const billingFetcher = useFetcher<BillingApiResponse>();

  // Refresh billing data
  const refreshBillingData = useCallback(() => {
    setIsLoading(true);
    setError(null);
    billingFetcher.load('/api/billing');
  }, []);

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

  // Initial load - chỉ chạy một lần khi component mount
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    billingFetcher.load('/api/billing');
  }, []); // Empty dependency array để chỉ chạy một lần

  return {
    selectedPlan,
    isLoading,
    error,
    refreshBillingData
  };
}
