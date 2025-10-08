export interface UsePlansActionsResult<T extends string | number | symbol = string> {
  handlePlanChange: (plan: T, callback?: (plan: T) => void) => void;
  handlePlanUpgrade: (planType: T) => Promise<void>;
  upgradeLoading: boolean;
}
