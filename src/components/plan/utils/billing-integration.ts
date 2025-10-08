import { PlanType } from '../types/plan.type';
/**
 * Check if a plan requires billing
 */
export function isPaidPlan(plan: PlanType): boolean {
  return plan !== 'free';
}
