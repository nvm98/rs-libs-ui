import { Layout, Card, Spinner, Box, Text, BlockStack } from '@shopify/polaris';
import { PlansPackage } from './PlansPackage';
import { PlanUsage } from './PlanUsage';
import { usePlansLoader, usePlansActions } from './hooks';
import { PlansConfig } from './types/plan.type';

export interface PlansManagerProps<T extends PlansConfig = PlansConfig> {
  plans: T;
}

export function PlansManager<T extends PlansConfig = PlansConfig>({ plans }: PlansManagerProps<T>) {
  const { selectedPlan, isLoading, error, refreshBillingData } = usePlansLoader<T>();
  const { handlePlanChange, handlePlanUpgrade, upgradeLoading } = usePlansActions<T>();

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="400">
          <Card>
            <PlansPackage
              selectedPlan={selectedPlan}
              onPlanChange={handlePlanChange}
              onPlanUpgrade={handlePlanUpgrade}
              plans={plans}
              isLoadingSelectedPlan={isLoading || upgradeLoading}
              error={error}
              onRetry={refreshBillingData}
            />
          </Card>
          <Card>
            <PlanUsage
              selectedPlan={selectedPlan}
              isLoadingSelectedPlan={isLoading}
              error={error}
              onRetry={refreshBillingData}
            />
          </Card>
        </BlockStack>
      </Layout.Section>
    </Layout>
  );
}
