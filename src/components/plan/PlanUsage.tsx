import { BlockStack, Box, FormLayout, InlineStack, Text, SkeletonBodyText, Banner, Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { PlanType, PlansConfig } from "./types/plan.type";

interface PlanUsageProps<T extends PlansConfig = PlansConfig> {
  selectedPlan: PlanType<T> | null;
  isLoadingSelectedPlan?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function PlanUsage<T extends PlansConfig = PlansConfig>({
  selectedPlan,
  isLoadingSelectedPlan = false,
  error,
  onRetry
}: PlanUsageProps<T>) {
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

          {error && (
            <Banner tone="warning">
              <InlineStack gap="300" align="space-between" blockAlign="center">
                <p>{t('usage.loadError', { error })}</p>
                {onRetry && (
                  <Button
                    size="slim"
                    onClick={onRetry}
                    loading={isLoadingSelectedPlan}
                  >
                    {t('usage.retryButton')}
                  </Button>
                )}
              </InlineStack>
            </Banner>
          )}

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
            {isLoadingSelectedPlan ? (
              <SkeletonBodyText lines={2} />
            ) : error ? (
              <Text as="p" variant="bodyMd" tone="subdued">
                {t('usage.comparisonError')}
              </Text>
            ) : (
              <Text as="p" variant="bodyMd">
                {selectedPlan === 'fixed'
                  ? t('usage.fixedPlanComparison', { price: '$9.99', amount: '$92.46' })
                  : t('usage.paygPlanComparison')
                }
              </Text>
            )}
          </Box>
        </BlockStack>
      </Box>
    </FormLayout>
  )
}
