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
import { parsePaddingValue, parsePixelValue } from "@shared/utils/blocks.util";
import { TextBlock } from "@email-template/types";

export function TextBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps<TextBlock>) {
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
