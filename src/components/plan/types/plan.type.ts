export type PlanType = 'free' | 'fixed' | 'usage'

// Map UI plan types to Shopify billing plan names
export const PLAN_MAPPING: Record<string, string> = {
  free: 'Free',
  fixed: 'Fixed',
  usage: 'Usage'
};

// Plan pricing configuration
export const PLAN_PRICING = {
  free: 0,
  fixed: 14.99,
  usage: 'Usage-based'
};
