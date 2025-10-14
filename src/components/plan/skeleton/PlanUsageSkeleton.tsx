import { BlockStack, Box, FormLayout, InlineStack, Text, SkeletonBodyText } from "@shopify/polaris";
import { useTranslation } from "react-i18next";

export function PlanUsageSkeleton() {
  const { t } = useTranslation('plans');
  return (
    <FormLayout>
      <Box>
        <BlockStack gap="300">
          <BlockStack gap="150">
            <Text variant="headingMd" as="h3">
              {t('usage.title')}
            </Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              {t('usage.description')}
            </Text>
          </BlockStack>

          <InlineStack gap="500" wrap>
            <BlockStack gap="100">
              <Text variant="bodyMd" as="p">{t('usage.activeSubscriptions')}</Text>
              <Text variant="headingLg" as="h4">247</Text>
            </BlockStack>

            <BlockStack gap="100">
              <Text variant="bodyMd" as="p">{t('usage.emailNotifications')}</Text>
              <Text variant="headingLg" as="h4">1,523</Text>
            </BlockStack>

            <BlockStack gap="100">
              <Text variant="bodyMd" as="p">{t('usage.smsNotifications')}</Text>
              <Text variant="headingLg" as="h4">89</Text>
            </BlockStack>

            <BlockStack gap="100">
              <Text variant="bodyMd" as="p">{t('usage.estimatedCost')}</Text>
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
