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
  return isNaN(parsed) ? 6 : parsed;
};

export function ButtonBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps) {
  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Content</Text>

      <TextField
        label="Button Text"
        value={block.content.text || ''}
        onChange={(value) => updateContent({ text: value })}
        placeholder="Click Here"
        autoComplete="off"
      />

      <TextField
        label="Link URL"
        value={block.content.link || ''}
        onChange={(value) => updateContent({ link: value })}
        placeholder="https://example.com"
        autoComplete="off"
      />

      <Divider />

      <Text as="h4" variant="headingXs">Styling</Text>

      <Box>
        <Text as="p" variant="bodyMd" tone="base">Background Color</Text>
        <Box paddingBlockStart="100">
          <input
            type="color"
            value={block.styles.backgroundColor || '#007ace'}
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
            value={block.styles.color || '#ffffff'}
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
            <Text as="p" variant="bodyMd">Border Radius</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.styles.borderRadius || '6px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.styles.borderRadius || '6px')}
          min={0}
          max={24}
          step={1}
          onChange={(value) => updateStyles({ borderRadius: `${value}px` })}
        />
      </Box>
      
      <Select
        label="Alignment"
        options={[
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ]}
        value={block.styles.textAlign || 'center'}
        onChange={(value) => updateStyles({ textAlign: value })}
      />
    </BlockStack>
  );
}
