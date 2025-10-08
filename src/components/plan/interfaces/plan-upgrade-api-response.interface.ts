import { PlanType } from "@plan/types/plan.type";

export interface PlanUpgradeApiResponse {
  success: boolean;
  data?: { plan: PlanType };
  error?: string;
}
