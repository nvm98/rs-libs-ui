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

export function HeaderBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps) {
  // Helper functions to convert between different units
  const parsePixelValue = (value: string): number => {
    const parsed = parseInt(value.replace('px', ''));
    return isNaN(parsed) ? 0 : parsed;
  };

  const parsePaddingValue = (value: string): number => {
    // Handle padding like "24px" or "24px 16px" - take first value
    const firstValue = value.split(' ')[0];
    return parsePixelValue(firstValue);
  };

  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Content</Text>

      <TextField
        label="Header Text"
        value={block.content.text || ''}
        onChange={(value) => updateContent({ text: value })}
        placeholder="Welcome to our store!"
        autoComplete="off"
      />

      <Select
        label="Header Level"
        options={[
          { label: 'H1 (Largest)', value: 'h1' },
          { label: 'H2 (Large)', value: 'h2' },
          { label: 'H3 (Medium)', value: 'h3' },
          { label: 'H4 (Small)', value: 'h4' }
        ]}
        value={block.content.level || 'h2'}
        onChange={(value) => updateContent({ level: value })}
      />

      <Select
        label="Text Alignment"
        options={[
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ]}
        value={block.content.alignment || 'center'}
        onChange={(value) => updateContent({ alignment: value })}
      />

      <Divider />

      <Text as="h4" variant="headingXs">Styling</Text>

      <Box>
        <Text as="p" variant="bodyMd">Background Color</Text>
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
        <Text as="p" variant="bodyMd">Text Color</Text>
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
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Font Size</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.styles.fontSize || '24px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.styles.fontSize || '24px')}
          min={12}
          max={72}
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
