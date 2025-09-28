import {
  BlockStack,
  Text,
  RangeSlider,
  Box,
  InlineStack
} from "@shopify/polaris";
import { BlockSettingsStyleOnlyProps } from './types/BlockSettingsTypes';

// Helper function to parse margin values (simplified to single value)
const parseMarginValue = (value: string): number => {
  const firstValue = value.split(' ')[0];
  const parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? 24 : parsed;
};

export function DividerBlockSettings({
  block,
  updateStyles
}: BlockSettingsStyleOnlyProps) {
  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Styling</Text>

      <Box>
        <Text as="p" variant="bodyMd" tone="base">Border Color</Text>
        <Box paddingBlockStart="100">
          <input
            type="color"
            value={block.styles.borderColor || '#e1e3e5'}
            onChange={(e) => updateStyles({ borderColor: e.target.value })}
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

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Margin</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parseMarginValue(block.styles.margin || '24px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parseMarginValue(block.styles.margin || '24px')}
          min={0}
          max={80}
          step={4}
          onChange={(value) => updateStyles({ margin: `${value}px 0` })}
        />
      </Box>
    </BlockStack>
  );
}
