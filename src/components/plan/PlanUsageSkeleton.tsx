import { BlockStack, Box, FormLayout, InlineStack, Text, SkeletonBodyText } from "@shopify/polaris";

export function PlanUsageSkeleton() {
  return (
    <FormLayout>
      <Box>
        <BlockStack gap="300">
          <BlockStack gap="150">
            <Text variant="headingMd" as="h3">
              Current Month Usage
            </Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              Track your app usage and estimated costs for this billing period.
            </Text>
          </BlockStack>

          <InlineStack gap="500" wrap>
            <BlockStack gap="100">
              <Text variant="bodyMd" as="p">Active Subscriptions</Text>
              <Text variant="headingLg" as="h4">247</Text>
            </BlockStack>

            <BlockStack gap="100">
              <Text variant="bodyMd" as="p">Email Notifications</Text>
              <Text variant="headingLg" as="h4">1,523</Text>
            </BlockStack>

            <BlockStack gap="100">
              <Text variant="bodyMd" as="p">SMS Notifications</Text>
              <Text variant="headingLg" as="h4">89</Text>
            </BlockStack>

            <BlockStack gap="100">
              <Text variant="bodyMd" as="p">Estimated PAYG Cost</Text>
              <Text variant="headingLg" tone="success" as="h4">$102.45</Text>
            </BlockStack>
          </InlineStack>

          <Box
            padding="300"
            background="bg-surface-secondary"
            borderRadius="200"
          >
            <SkeletonBodyText lines={2} />
          </Box>
        </BlockStack>
      </Box>
    </FormLayout>
  );
}
