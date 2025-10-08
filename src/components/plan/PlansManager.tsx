import { Layout, Card, Spinner, Box, Text, BlockStack } from '@shopify/polaris';
import { PlansPackage } from './PlansPackage';
import { PlanUsage } from './PlanUsage';
import { Plan } from './interfaces';
import { usePlansLoader, usePlansActions } from './hooks';
import { PlansConfig } from './types/plan.type';

export interface PlansManagerProps<T extends PlansConfig = PlansConfig> {
  plans: T;
}

export function PlansManager<T extends PlansConfig = PlansConfig>({ plans }: PlansManagerProps<T>) {
  const { selectedPlan, isLoading, error } = usePlansLoader<T>();
  const { handlePlanChange, handlePlanUpgrade, upgradeLoading } = usePlansActions<T>();

  if (isLoading || upgradeLoading) {
    return (
      <Box padding="400">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner accessibilityLabel="Loading plan details" size="large" />
        </div>
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="400">
        <Text as="p" alignment="center" tone="critical">
          {error}
        </Text>
      </Box>
    );
  }

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
            />
          </Card>
          <Card>
            <PlanUsage selectedPlan={selectedPlan} />
          </Card>
        </BlockStack>
      </Layout.Section>
    </Layout>
  );
}
