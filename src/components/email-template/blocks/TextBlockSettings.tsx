import {
  BlockStack,
  TextField,
  Select,
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
  return isNaN(parsed) ? 16 : parsed;
};

// Helper function to parse padding values (simplified to single value)
const parsePaddingValue = (value: string): number => {
  const firstValue = value.split(' ')[0];
  const parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? 16 : parsed;
};

export function TextBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps) {
  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Content</Text>
        <TextField
          label="Text Content"
          value={block.content.text || ''}
          onChange={(value) => updateContent({ text: value })}
          multiline={4}
          autoSize
          autoComplete="off"
        />
      <Divider />

      <Text as="h4" variant="headingXs">Styling</Text>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Font Size</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.styles.fontSize || '16px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.styles.fontSize || '16px')}
          min={12}
          max={48}
          step={1}
          onChange={(value) => updateStyles({ fontSize: `${value}px` })}
        />
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
      
      <Select
        label="Text Alignment"
        options={[
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ]}
        value={block.styles.textAlign || 'left'}
        onChange={(value) => updateStyles({ textAlign: value as 'left' | 'center' | 'right' })}
      />
      
      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Padding</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePaddingValue(block.styles.padding || '16px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePaddingValue(block.styles.padding || '16px')}
          min={0}
          max={80}
          step={4}
          onChange={(value) => updateStyles({ padding: `${value}px` })}
        />
      </Box>
    </BlockStack>
  );
}
