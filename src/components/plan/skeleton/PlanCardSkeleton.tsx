import { Card, BlockStack, Box, SkeletonBodyText, SkeletonDisplayText } from '@shopify/polaris';

export function PlanCardSkeleton() {
  return (
    <Card>
      <BlockStack gap="400">
        <Box padding="400">
          <BlockStack gap="300">
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={1} />
            <Box paddingBlockStart="200">
              <SkeletonBodyText lines={3} />
            </Box>
            <Box paddingBlockStart="300">
              <Box 
                background="bg-surface-secondary" 
                padding="300" 
                borderRadius="200"
              >
                <SkeletonBodyText lines={1} />
              </Box>
            </Box>
          </BlockStack>
        </Box>
      </BlockStack>
    </Card>
  );
}
