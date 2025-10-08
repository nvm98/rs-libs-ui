import { Plan } from '../interfaces/plan.interface';

// Plans object structure (similar to Shopify's Config['billing'])
export type PlansConfig<T extends Record<string, Plan> = Record<string, Plan>> = T;

// Extract plan keys from PlansConfig (similar to keyof Config['billing'])
export type PlanType<T extends PlansConfig = PlansConfig> = keyof T;
