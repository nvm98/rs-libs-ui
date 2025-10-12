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
import { parsePadding, parsePixelValue } from "@shared/utils/blocks.util";
import { ButtonBlock } from "@email-template/types";

export function ButtonBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps<ButtonBlock>) {
  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Content</Text>

      <TextField
        label="Button Text"
        value={block.content.buttonText || ''}
        onChange={(value) => updateContent({ buttonText: value })}
        placeholder="Click Here"
        autoComplete="off"
      />

      <TextField
        label="Link URL"
        value={block.content.linkUrl || ''}
        onChange={(value) => updateContent({ linkUrl: value })}
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
            value={block.styles.textColor || '#ffffff'}
            onChange={(e) => updateStyles({ textColor: e.target.value })}
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

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Vertical Padding</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePadding(block.styles.padding || '14px 32px').vertical}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePadding(block.styles.padding || '14px 32px').vertical}
          min={0}
          max={50}
          step={1}
          onChange={(value) => {
            const currentPadding = parsePadding(block.styles.padding || '14px 32px');
            updateStyles({ padding: `${value}px ${currentPadding.horizontal}px` });
          }}
        />
      </Box>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Horizontal Padding</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePadding(block.styles.padding || '14px 32px').horizontal}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePadding(block.styles.padding || '14px 32px').horizontal}
          min={0}
          max={100}
          step={1}
          onChange={(value) => {
            const currentPadding = parsePadding(block.styles.padding || '14px 32px');
            updateStyles({ padding: `${currentPadding.vertical}px ${value}px` });
          }}
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
    </BlockStack>
  );
}
