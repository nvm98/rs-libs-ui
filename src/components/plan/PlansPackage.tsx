import { useState } from 'react';
import {
  BlockStack,
  FormLayout,
  Grid,
  Banner,
} from "@shopify/polaris";
import { PlanCard } from "./PlanCard";
import { PlanFeature } from "./interfaces/plan-features.interface";
import { PlanType, PlansConfig } from "./types/plan.type";
import { Plan } from "./interfaces";

export interface PlansPackageProps<T extends PlansConfig = PlansConfig> {
  selectedPlan: PlanType<T>;
  onPlanChange: (plan: PlanType<T>) => void;
  onPlanUpgrade: (planType: PlanType<T>) => Promise<void>;
  plans: T;
  error?: string | null;
}

export function PlansPackage<T extends PlansConfig = PlansConfig>({
  selectedPlan,
  onPlanChange,
  onPlanUpgrade,
  plans,
  error,
}: PlansPackageProps<T>) {
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  // Convert plans object to array for rendering
  const plansArray = Object.values(plans) as Plan[];

  const handlePlanUpgrade = async (planType: PlanType<T>) => {
    try {
      setProcessingPlan(planType as string);
      await onPlanUpgrade(planType);
    } finally {
      setProcessingPlan(null);
    }
  };

  // Convert Plan interface features to PlanFeature format
  const convertFeatures = (features: any[]): PlanFeature[] => {
    return features.map(feature => ({ text: feature.text || feature }));
  };

  return (
    <FormLayout>
      <BlockStack gap="400">
        {error && (
          <Banner tone="critical">
            <p>{error}</p>
          </Banner>
        )}

        <Grid>
          {plansArray.map((plan) => (
            <Grid.Cell key={plan.type} columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 4 }}>
              <PlanCard
                id={plan.type}
                name={plan.name}
                price={plan.price}
                features={convertFeatures(plan.features)}
                isActive={selectedPlan === plan.type as PlanType}
                planType={plan.type as PlanType}
                onSelect={onPlanChange}
                onUpgrade={handlePlanUpgrade}
                buttonText={`Choose ${plan.name}`}
                activeButtonText="Current Plan"
                isLoading={processingPlan === plan.type}
              />
            </Grid.Cell>
          ))}
        </Grid>
      </BlockStack>
    </FormLayout>
  );
}
