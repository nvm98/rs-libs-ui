import { BillingData } from "./billing-data.interface";

export interface BillingApiResponse {
  success: boolean;
  data?: BillingData;
  error?: string;
}