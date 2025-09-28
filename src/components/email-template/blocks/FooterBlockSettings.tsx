import {
  BlockStack,
  TextField,
  Checkbox,
  Text,
  Divider,
  RangeSlider,
  Box,
  InlineStack
} from "@shopify/polaris";
import { BlockSettingsComponentProps } from './types/BlockSettingsTypes';

// Helper function to parse pixel values
const parsePixelValue = (value: string): number => {
  const parsed = parseInt(value.replace('px', ''));
  return isNaN(parsed) ? 12 : parsed;
};

// Helper function to parse padding values (simplified to single value)
const parsePaddingValue = (value: string): number => {
  const firstValue = value.split(' ')[0];
  const parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? 24 : parsed;
};

export function FooterBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps) {
  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Content</Text>

      <TextField
        label="Footer Text"
        value={block.content.text || ''}
        onChange={(value) => updateContent({ text: value })}
        placeholder="© 2024 {{shop_name}}. All rights reserved."
        multiline={2}
        autoComplete="off"
      />

      <TextField
        label="Unsubscribe Text"
        value={block.content.unsubscribeText || ''}
        onChange={(value) => updateContent({ unsubscribeText: value })}
        placeholder="Unsubscribe from these notifications"
        autoComplete="off"
      />

      <Checkbox
        label="Show Social Media Links"
        checked={block.content.showSocial}
        onChange={(checked) => updateContent({ showSocial: checked })}
      />

      <Divider />

      <Text as="h4" variant="headingXs">Styling</Text>

      <Box>
        <Text as="p" variant="bodyMd" tone="base">Background Color</Text>
        <Box paddingBlockStart="100">
          <input
            type="color"
            value={block.styles.backgroundColor || '#f8f9fa'}
            onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
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
        <Text as="p" variant="bodyMd" tone="base">Text Color</Text>
        <Box paddingBlockStart="100">
          <input
            type="color"
            value={block.styles.color || '#6c757d'}
            onChange={(e) => updateStyles({ color: e.target.value })}
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
            <Text as="p" variant="bodyMd">Font Size</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.styles.fontSize || '12px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.styles.fontSize || '12px')}
          min={10}
          max={24}
          step={1}
          onChange={(value) => updateStyles({ fontSize: `${value}px` })}
        />
      </Box>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Padding</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePaddingValue(block.styles.padding || '24px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePaddingValue(block.styles.padding || '24px')}
          min={0}
          max={80}
          step={4}
          onChange={(value) => updateStyles({ padding: `${value}px` })}
        />
      </Box>
    </BlockStack>
  );
}
