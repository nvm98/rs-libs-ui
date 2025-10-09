import { useState } from 'react';
import {
  BlockStack,
  FormLayout,
  Grid,
  Banner,
  Button,
  InlineStack,
  Box,
} from "@shopify/polaris";
import { useTranslation } from 'react-i18next';
import { PlanCard } from "./PlanCard";
import { PlansErrorState } from "./PlansErrorState";
import { PlanFeature } from "./interfaces/plan-features.interface";
import { PlanType, PlansConfig } from "./types/plan.type";
import { Plan } from "./interfaces";

export interface PlansPackageProps<T extends PlansConfig = PlansConfig> {
  selectedPlan: PlanType<T> | null;
  onPlanChange: (plan: PlanType<T>) => void;
  onPlanUpgrade: (planType: PlanType<T>) => Promise<void>;
  plans: T;
  error?: string | null;
  isLoadingSelectedPlan?: boolean;
  onRetry?: () => void;
}

export function PlansPackage<T extends PlansConfig = PlansConfig>({
  selectedPlan,
  onPlanChange,
  onPlanUpgrade,
  plans,
  error,
  isLoadingSelectedPlan = false,
  onRetry,
}: PlansPackageProps<T>) {
  const { t } = useTranslation('plans');
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

  // Nếu có lỗi nghiêm trọng và đang không loading, hiển thị error state
  if (error && !isLoadingSelectedPlan && selectedPlan === null) {
    return (
      <FormLayout>
        <PlansErrorState
          error={error}
          onRetry={onRetry}
          isRetrying={isLoadingSelectedPlan}
        />
      </FormLayout>
    );
  }

  return (
    <FormLayout>
      <BlockStack gap="400">
        {error && selectedPlan !== null && (
          <Banner tone="warning" onDismiss={onRetry}>
            <Box width='100%'>
              <InlineStack gap="300" align="space-between" blockAlign="center">
                <p>{t('errorUpdating')}: {error}</p>
                {onRetry && (
                  <Button
                    size="slim"
                    onClick={onRetry}
                    loading={isLoadingSelectedPlan}
                  >
                    {t('retry')}
                  </Button>
                )}
              </InlineStack>
            </Box>
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
                isActive={isLoadingSelectedPlan ? false : selectedPlan === plan.type as PlanType}
                planType={plan.type as PlanType}
                onSelect={onPlanChange}
                onUpgrade={handlePlanUpgrade}
                buttonText={t('choosePlan', { planName: plan.name })}
                activeButtonText={isLoadingSelectedPlan ? t('loading') : t('currentPlan')}
                isLoading={processingPlan === plan.type}
                isSelectedPlanLoading={isLoadingSelectedPlan}
              />
            </Grid.Cell>
          ))}
        </Grid>
      </BlockStack>
    </FormLayout>
  );
}
