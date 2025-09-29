import React from 'react';
import {
  Card,
  TextField,
  Button,
  Text,
  Checkbox,
  BlockStack
} from '@shopify/polaris';
import { SMSBlock, SMSBlockType } from './types';
import { COMMON_EMOJIS } from './constants';

interface SMSBlockSettingsProps {
  block: SMSBlock;
  onUpdate: (updates: Partial<SMSBlock>) => void;
}

export const SMSBlockSettings: React.FC<SMSBlockSettingsProps> = ({ block, onUpdate }) => {
  const renderSettings = () => {
    switch (block.type) {
      case SMSBlockType.TEXT:
        const textBlock = block as any;
        return (
          <TextField
            label="Text Content"
            value={textBlock.text || ''}
            onChange={(value) => onUpdate({ text: value })}
            placeholder="Enter text content"
            multiline={3}
            autoComplete="off"
          />
        );

      case SMSBlockType.VARIABLE:
        const variableBlock = block as any;
        return (
          <BlockStack gap="400">
            <TextField
              label="Variable Name"
              value={variableBlock.variable_name || ''}
              onChange={(value) => onUpdate({ variable_name: value })}
              placeholder="customer_name"
              autoComplete="off"
            />
            <TextField
              label="Default Value"
              value={variableBlock.default_value || ''}
              onChange={(value) => onUpdate({ default_value: value })}
              placeholder="Default value if variable is empty"
              autoComplete="off"
            />
          </BlockStack>
        );

      case SMSBlockType.LINK:
        const linkBlock = block as any;
        return (
          <BlockStack gap="400">
            <TextField
              label="URL"
              value={linkBlock.url || ''}
              onChange={(value) => onUpdate({ url: value })}
              placeholder="https://example.com"
              autoComplete="off"
            />
            <TextField
              label="Display Text (optional)"
              value={linkBlock.text || ''}
              onChange={(value) => onUpdate({ text: value })}
              placeholder="Click here"
              autoComplete="off"
            />
            <Checkbox
              label="Shorten URL"
              checked={linkBlock.shorten || false}
              onChange={(value) => onUpdate({ shorten: value })}
              helpText="Automatically shorten the URL to save characters"
            />
          </BlockStack>
        );

      case SMSBlockType.PHONE:
        const phoneBlock = block as any;
        return (
          <BlockStack gap="400">
            <TextField
              label="Phone Number"
              value={phoneBlock.phone_number || ''}
              onChange={(value) => onUpdate({ phone_number: value })}
              placeholder="+1234567890"
              autoComplete="off"
            />
            <TextField
              label="Country Code (optional)"
              value={phoneBlock.country_code || ''}
              onChange={(value) => onUpdate({ country_code: value })}
              placeholder="+1"
              autoComplete="off"
            />
          </BlockStack>
        );

      case SMSBlockType.EMOJI:
        const emojiBlock = block as any;
        return (
          <BlockStack gap="400">
            <TextField
              label="Selected Emoji"
              value={emojiBlock.emoji || ''}
              onChange={(value) => onUpdate({ emoji: value })}
              placeholder="😀"
              autoComplete="off"
            />
            <Text as="h4" variant="headingXs">Common Emojis</Text>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '8px',
              maxHeight: '200px',
              overflowY: 'auto',
              padding: '8px',
              border: '1px solid #e1e3e5',
              borderRadius: '4px'
            }}>
              {COMMON_EMOJIS.map((emoji, index) => (
                <Button
                  key={index}
                  size="slim"
                  onClick={() => onUpdate({ emoji })}
                  pressed={emojiBlock.emoji === emoji}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </BlockStack>
        );

      default:
        return <Text as="p" variant="bodyMd" tone="subdued">No settings for this block type.</Text>;
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">
          Settings: {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
        </Text>
        {renderSettings()}
      </BlockStack>
    </Card>
  );
};
