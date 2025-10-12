import {
  BlockStack,
  TextField,
  Select,
  Text,
  Divider,
  RangeSlider,
  Box,
  InlineStack,
  Checkbox
} from "@shopify/polaris";
import { BlockSettingsComponentProps } from './types/BlockSettingsTypes';
import { parsePaddingValue, parsePixelValue } from "@shared/utils/common.util";

export function HeaderBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps) {

  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Content</Text>

      <TextField
        label="Logo URL"
        value={block.content.logoUrl || ''}
        onChange={(value) => updateContent({ logoUrl: value })}
        placeholder="https://example.com/logo.png"
        autoComplete="off"
      />

      <TextField
        label="Logo Alt Text"
        value={block.content.logoAltText || ''}
        onChange={(value) => updateContent({ logoAltText: value })}
        placeholder="Company Logo"
        autoComplete="off"
      />

      <TextField
        label="Logo Link URL"
        value={block.content.logoLinkUrl || ''}
        onChange={(value) => updateContent({ logoLinkUrl: value })}
        placeholder="https://example.com"
        autoComplete="off"
      />

      <Checkbox
        label="Show Web View Link"
        checked={block.content.showWebViewLink || false}
        onChange={(checked) => updateContent({ showWebViewLink: checked })}
      />

      <Select
        label="Alignment"
        options={[
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ]}
        value={block.content.alignment || 'center'}
        onChange={(value) => updateContent({ alignment: value })}
      />

      <Divider />

      <Text as="h4" variant="headingXs">Logo Styling</Text>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Logo Width</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.styles.logoStyles?.width || '120px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.styles.logoStyles?.width || '120px')}
          min={20}
          max={500}
          step={10}
          onChange={(value) => updateStyles({ logoStyles: { ...block.styles.logoStyles, width: `${value}px` } })}
        />
      </Box>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Border Radius</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.styles.logoStyles?.borderRadius || '0px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.styles.logoStyles?.borderRadius || '0px')}
          min={0}
          max={100}
          step={1}
          onChange={(value) => updateStyles({ logoStyles: { ...block.styles.logoStyles, borderRadius: `${value}px` } })}
        />
      </Box>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Logo Padding</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.styles.logoStyles?.padding || '0px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.styles.logoStyles?.padding || '0px')}
          min={0}
          max={50}
          step={2}
          onChange={(value) => updateStyles({ logoStyles: { ...block.styles.logoStyles, padding: `${value}px` } })}
        />
      </Box>

      <Divider />

      <Text as="h4" variant="headingXs">Block Styling</Text>

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
