import { 
  BlockStack, 
  Box, 
  Text, 
  Button, 
  InlineStack,
  Icon
} from "@shopify/polaris";
import { AlertTriangleIcon } from "@shopify/polaris-icons";

interface PlansErrorStateProps {
  error: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function PlansErrorState({ 
  error, 
  onRetry, 
  isRetrying = false 
}: PlansErrorStateProps) {
  return (
    <Box padding="600">
      <BlockStack gap="400" align="center">
        <Box 
          background="bg-surface-critical" 
          padding="300" 
          borderRadius="full"
        >
          <Icon source={AlertTriangleIcon} tone="critical" />
        </Box>
        
        <BlockStack gap="200" align="center">
          <Text variant="headingMd" as="h3" alignment="center">
            Unable to load plan information
          </Text>
          <Text as='span' variant="bodyMd" tone="subdued" alignment="center">
            {error}
          </Text>
        </BlockStack>

        {onRetry && (
          <Button
            onClick={onRetry}
            loading={isRetrying}
            variant="primary"
          >
            Retry
          </Button>
        )}
      </BlockStack>
    </Box>
  );
}
