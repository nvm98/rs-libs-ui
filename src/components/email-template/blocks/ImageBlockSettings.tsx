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
  return isNaN(parsed) ? 300 : parsed;
};

// Helper function to parse padding values (simplified to single value)
const parsePaddingValue = (value: string): number => {
  const firstValue = value.split(' ')[0];
  const parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? 16 : parsed;
};

export function ImageBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps) {
  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Content</Text>

      <TextField
        label="Image URL"
        value={block.content.imageUrl || ''}
        onChange={(value) => updateContent({ imageUrl: value })}
        placeholder="https://example.com/image.jpg"
        autoComplete="off"
      />

      <TextField
        label="Alt Text"
        value={block.content.altText || ''}
        onChange={(value) => updateContent({ altText: value })}
        placeholder="Image description"
        autoComplete="off"
      />

      <TextField
        label="Link URL (optional)"
        value={block.content.linkUrl || ''}
        onChange={(value) => updateContent({ linkUrl: value })}
        placeholder="https://example.com"
        autoComplete="off"
      />

      <TextField
        label="Caption (optional)"
        value={block.content.caption || ''}
        onChange={(value) => updateContent({ caption: value })}
        placeholder="Image caption"
        autoComplete="off"
      />

      <Divider />

      <Text as="h4" variant="headingXs">Styling</Text>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Width</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.styles.width || '300px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.styles.width || '300px')}
          min={100}
          max={600}
          step={10}
          onChange={(value) => updateStyles({ width: `${value}px` })}
        />
      </Box>

      <Select
        label="Alignment"
        options={[
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ]}
        value={block.styles.alignment || 'center'}
        onChange={(value) => updateStyles({ alignment: value as 'left' | 'center' | 'right' })}
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
