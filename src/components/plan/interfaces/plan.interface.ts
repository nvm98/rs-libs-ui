import { PlanFeature } from "./plan-features.interface";

export interface Plan {
  type: string,
  name: string;
  price: string | number;
  priceUnit?: string;
  features: PlanFeature[],
}
