import { Layout, Card, Spinner, Box, Text, BlockStack } from '@shopify/polaris';
import { PlansPackage } from './PlansPackage';
import { PlanUsage } from './PlanUsage';
import { Plan } from './interfaces';
import { usePlans } from './hooks';

export interface PlansManagerProps {
  plans: Plan[];
}

export function PlansManager({ plans }: PlansManagerProps) {
  const { selectedPlan, isLoading, error, handlePlanChange, handlePlanUpgrade } = usePlans();

  if (isLoading) {
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
