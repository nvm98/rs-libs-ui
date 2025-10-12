import {
  BlockStack,
  Text,
  RangeSlider,
  Box,
  InlineStack,
  Select
} from "@shopify/polaris";
import { BlockSettingsComponentProps } from './types/BlockSettingsTypes';
import { DividerBlock, LineStyleType } from '../types/divider-block.type';
import { parseLineHeightValue, parseMarginValue, parseWidthValue } from "@shared/utils/blocks.util";

export function DividerBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps<DividerBlock>) {
  const lineStyleOptions = [
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' }
  ];

  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Content</Text>

      <Box>
        <Select
          label="Line Style"
          options={lineStyleOptions}
          value={block.content.lineStyle || 'solid'}
          onChange={(value) => updateContent({ lineStyle: value as LineStyleType })}
        />
      </Box>

      <Box>
        <Text as="p" variant="bodyMd" tone="base">Line Color</Text>
        <Box paddingBlockStart="100">
          <input
            type="color"
            value={block.content.lineColor || '#e1e3e5'}
            onChange={(e) => updateContent({ lineColor: e.target.value })}
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
            <Text as="p" variant="bodyMd">Line Height</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parseLineHeightValue(block.content.lineHeight || '1px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parseLineHeightValue(block.content.lineHeight || '1px')}
          min={1}
          max={10}
          step={1}
          onChange={(value) => updateContent({ lineHeight: `${value}px` })}
        />
      </Box>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Width</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parseWidthValue(block.content.width || '80%')}%</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parseWidthValue(block.content.width || '80%')}
          min={10}
          max={100}
          step={5}
          onChange={(value) => updateContent({ width: `${value}%` })}
        />
      </Box>

      <Text as="h4" variant="headingXs">Styling</Text>

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
