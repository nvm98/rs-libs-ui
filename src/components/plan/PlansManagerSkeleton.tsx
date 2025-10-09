import { Layout, Card, BlockStack } from '@shopify/polaris';
import { PlanCardSkeleton } from './PlanCardSkeleton';
import { PlanUsageSkeleton } from './PlanUsageSkeleton';

export function PlansManagerSkeleton() {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="400">
          <PlanCardSkeleton />
          <Card>
            <PlanUsageSkeleton />
          </Card>
        </BlockStack>
      </Layout.Section>
    </Layout>
  );
}
