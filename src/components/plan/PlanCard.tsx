import { useState } from 'react';
import {
  BlockStack,
  Text,
  Button,
  InlineStack,
  Card,
  Box,
} from "@shopify/polaris";
import { PlanType } from './types/plan.type';
import { isPaidPlan } from './utils/billing-integration';
import { PlanFeature } from './interfaces';

export interface PlanCardProps {
  id: string;
  name: string;
  price: string | number;
  priceUnit?: string;
  features: PlanFeature[];
  isActive: boolean;
  planType: PlanType;
  onSelect: (planType: PlanType) => void;
  onUpgrade?: (planType: PlanType) => Promise<void>;
  buttonText?: string;
  activeButtonText?: string;
  description?: string;
  isLoading?: boolean;
  isSelectedPlanLoading?: boolean;
}

export function PlanCard({
  name,
  price,
  priceUnit = "/ month",
  features,
  isActive,
  planType,
  onSelect,
  onUpgrade,
  buttonText,
  activeButtonText,
  description,
  isLoading = false,
  isSelectedPlanLoading = false,
}: PlanCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlanSelection = async () => {
    if (isActive || isProcessing) return;

    setIsProcessing(true);
    try {
      if (isPaidPlan(planType) && onUpgrade) {
        await onUpgrade(planType);
      } else {
        onSelect(planType);
      }
    } catch (error) {
      console.error('Error selecting plan:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getButtonText = () => {
    if (isProcessing || isLoading) {
      return 'Processing...';
    }

    if (isSelectedPlanLoading) {
      return 'Loading...';
    }

    if (isActive && activeButtonText) {
      return activeButtonText;
    }

    if (buttonText) {
      return buttonText;
    }

    if (isActive) {
      return 'Current Plan';
    }

    if (isPaidPlan(planType)) {
      return `Upgrade to ${name}`;
    }

    return `Choose ${name}`;
  };

  const renderPrice = () => {
    if (typeof price === 'string') {
      return (
        <Text variant="headingXl" as="h2">
          {price}
        </Text>
      );
    }

    return (
      <InlineStack gap="100" blockAlign="baseline">
        <Text variant="headingXl" as="h2">
          ${price}
        </Text>
        <Text variant="bodyLg" tone="subdued" as="span">
          {priceUnit}
        </Text>
      </InlineStack>
    );
  };

  return (
    <Box
      borderRadius="300"
    >
      <Card>
        <BlockStack gap="300">
        {/* Header */}
        <BlockStack gap="100">
          <Text variant="bodyMd" as="p">
            {name}
          </Text>

          {renderPrice()}

          {description && (
            <Text variant="bodySm" tone="subdued" as="p">
              {description}
            </Text>
          )}
        </BlockStack>

        {/* Divider */}
        <Box borderBlockStartWidth="025" borderColor="border" />

        {/* Features List */}
        <BlockStack gap="150">
          {features.map((feature, index) => (
            <Text key={index} variant="bodyMd" as="p">
              {feature.text}
            </Text>
          ))}
        </BlockStack>

        {/* CTA Button */}
        <Button
          tone={isActive ? 'success' : undefined}
          variant="primary"
          onClick={handlePlanSelection}
          disabled={isActive || isProcessing || isLoading || isSelectedPlanLoading}
          size="large"
          fullWidth
        >
          {getButtonText()}
        </Button>
        </BlockStack>
      </Card>
    </Box>
  );
}