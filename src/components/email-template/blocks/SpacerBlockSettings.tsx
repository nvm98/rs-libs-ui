import {
  BlockStack,
  Text,
  RangeSlider,
  Box,
  InlineStack
} from "@shopify/polaris";
import { BlockSettingsStyleOnlyProps } from './types/BlockSettingsTypes';

// Helper function to parse pixel values
const parsePixelValue = (value: string): number => {
  const parsed = parseInt(value.replace('px', ''));
  return isNaN(parsed) ? 32 : parsed;
};

export function SpacerBlockSettings({
  block,
  updateStyles
}: BlockSettingsStyleOnlyProps) {
  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Sizing</Text>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Height</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.styles.height || '32px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.styles.height || '32px')}
          min={8}
          max={120}
          step={4}
          onChange={(value) => updateStyles({ height: `${value}px` })}
        />
      </Box>
    </BlockStack>
  );
}
