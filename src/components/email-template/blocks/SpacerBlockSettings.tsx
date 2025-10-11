import {
  BlockStack,
  Text,
  RangeSlider,
  Box,
  InlineStack
} from "@shopify/polaris";
import { BlockSettingsComponentProps } from './types/BlockSettingsTypes';

// Helper function to parse pixel values
const parsePixelValue = (value: string): number => {
  const parsed = parseInt(value.replace('px', ''));
  return isNaN(parsed) ? 32 : parsed;
};

export function SpacerBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps) {
  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Content</Text>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Height</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.content.height || '32px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.content.height || '32px')}
          min={8}
          max={120}
          step={4}
          onChange={(value) => updateContent({ height: `${value}px` })}
        />
      </Box>

      <Box>
        <Text as="p" variant="bodyMd" tone="base">Background Color</Text>
        <Box paddingBlockStart="100">
          <input
            type="color"
            value={block.content.backgroundColor || '#ffffff'}
            onChange={(e) => updateContent({ backgroundColor: e.target.value })}
            style={{
              width: '100%',
              height: '36px',
              border: '1px solid #c9cccf',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          />
        </Box>
      </Box>
    </BlockStack>
  );
}
