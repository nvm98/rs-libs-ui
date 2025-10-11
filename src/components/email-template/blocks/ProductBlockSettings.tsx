import {
  BlockStack,
  Checkbox,
  Text,
  Divider,
  RangeSlider,
  Box,
  InlineStack,
  Select,
  TextField
} from "@shopify/polaris";
import { BlockSettingsComponentProps } from './types/BlockSettingsTypes';
import { ProductLayoutType } from '../types/product-block.type';

// Helper function to parse padding values (simplified to single value)
const parsePaddingValue = (value: string): number => {
  const firstValue = value.split(' ')[0];
  const parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? 20 : parsed;
};

// Helper function to parse border width from border string
const parseBorderWidth = (borderValue: string): number => {
  const match = borderValue.match(/(\d+)px/);
  return match ? parseInt(match[1]) : 1;
};

// Helper function to parse border color from border string
const parseBorderColor = (borderValue: string): string => {
  const match = borderValue.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/);
  return match ? match[0] : '#e1e3e5';
};

export function ProductBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps) {
  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Layout</Text>

      <Select
        label="Product Layout"
        options={[
          { label: 'Single', value: 'single' },
          { label: 'Grid', value: 'grid' },
          { label: 'List', value: 'list' },
        ]}
        value={block.content.productLayout || 'single'}
        onChange={(value) => updateContent({ productLayout: value as ProductLayoutType })}
      />

      <Divider />

      <Text as="h4" variant="headingXs">Display Options</Text>

      <Checkbox
        label="Show Product Name"
        checked={block.content.showProductName}
        onChange={(checked) => updateContent({ showProductName: checked })}
      />

      <Checkbox
        label="Show Product Price"
        checked={block.content.showProductPrice}
        onChange={(checked) => updateContent({ showProductPrice: checked })}
      />

      <Checkbox
        label="Show Product Description"
        checked={block.content.showProductDescription}
        onChange={(checked) => updateContent({ showProductDescription: checked })}
      />

      <Checkbox
        label="Show CTA Button"
        checked={block.content.showCTAButton}
        onChange={(checked) => updateContent({ showCTAButton: checked })}
      />

      {block.content.showCTAButton && (
        <TextField
          label="Button Text"
          value={block.content.buttonText || ''}
          onChange={(value) => updateContent({ buttonText: value })}
          placeholder="e.g., Buy Now"
          autoComplete="off"
        />
      )}

      <Divider />

      <Text as="h4" variant="headingXs">Styling</Text>

      <Box>
        <Text as="p" variant="bodyMd" tone="base">Background Color</Text>
        <Box paddingBlockStart="100">
          <input
            type="color"
            value={block.styles.backgroundColor || '#ffffff'}
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
            value={block.styles.color || '#333333'}
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
        <Text as="p" variant="bodyMd" tone="base">Border Color</Text>
        <Box paddingBlockStart="100">
          <input
            type="color"
            value={parseBorderColor(block.styles.border || '1px solid #e1e3e5')}
            onChange={(e) => {
              const currentWidth = parseBorderWidth(block.styles.border || '1px solid #e1e3e5');
              updateStyles({ border: `${currentWidth}px solid ${e.target.value}` });
            }}
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
            <Text as="p" variant="bodyMd">Border Width</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parseBorderWidth(block.styles.border || '1px solid #e1e3e5')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parseBorderWidth(block.styles.border || '1px solid #e1e3e5')}
          min={0}
          max={8}
          step={1}
          onChange={(value) => {
            const currentColor = parseBorderColor(block.styles.border || '1px solid #e1e3e5');
            updateStyles({ border: value === 0 ? 'none' : `${value}px solid ${currentColor}` });
          }}
        />
      </Box>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Padding</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePaddingValue(block.styles.padding || '20px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePaddingValue(block.styles.padding || '20px')}
          min={0}
          max={80}
          step={4}
          onChange={(value) => updateStyles({ padding: `${value}px` })}
        />
      </Box>
    </BlockStack>
  );
}
