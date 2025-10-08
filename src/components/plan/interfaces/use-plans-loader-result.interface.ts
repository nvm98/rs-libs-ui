export interface UsePlansLoaderResult<T extends string | number | symbol = string> {
  selectedPlan: T;
  isLoading: boolean;
  error: string | null;
  refreshBillingData: () => void;
}
