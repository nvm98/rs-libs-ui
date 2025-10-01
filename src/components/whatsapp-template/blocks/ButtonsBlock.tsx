import React from 'react';
import { Select, TextField, Button, InlineStack, Text, Divider, BlockStack } from '@shopify/polaris';
import { PlusIcon, DeleteIcon } from '@shopify/polaris-icons';
import { WhatsAppButtonsBlock, WhatsAppButton } from '../types';

interface ButtonsBlockProps {
  block: WhatsAppButtonsBlock;
  onUpdate: (updates: Partial<WhatsAppButtonsBlock>) => void;
}

const buttonTypeOptions = [
  { label: 'Quick Reply', value: 'QUICK_REPLY' },
  { label: 'URL', value: 'URL' },
  { label: 'Phone Number', value: 'PHONE_NUMBER' }
];

export const ButtonsBlock: React.FC<ButtonsBlockProps> = ({ block, onUpdate }) => {
  const addButton = () => {
    const newButton: WhatsAppButton = {
      type: 'QUICK_REPLY',
      text: ''
    };
    onUpdate({
      buttons: [...(block.buttons || []), newButton]
    });
  };

  const updateButton = (index: number, updates: Partial<WhatsAppButton>) => {
    const updatedButtons = [...(block.buttons || [])];
    updatedButtons[index] = { ...updatedButtons[index], ...updates };
    onUpdate({ buttons: updatedButtons });
  };

  const removeButton = (index: number) => {
    const updatedButtons = [...(block.buttons || [])];
    updatedButtons.splice(index, 1);
    onUpdate({ buttons: updatedButtons });
  };

  return (
    <BlockStack gap="400">
      {block.buttons?.map((button, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Divider />}
          <BlockStack gap="300">
            <InlineStack align="space-between">
              <Text as="h3" variant="headingSm">Button {index + 1}</Text>
              <Button
                icon={DeleteIcon}
                variant="tertiary"
                tone="critical"
                onClick={() => removeButton(index)}
              />
            </InlineStack>

            <Select
              label="Button Type"
              options={buttonTypeOptions}
              value={button.type}
              onChange={(value) => updateButton(index, { type: value as any })}
            />

            <TextField
              autoComplete='off'
              label="Button Text"
              value={button.text}
              onChange={(value) => updateButton(index, { text: value })}
              placeholder="Button text"
            />

            {button.type === 'URL' && (
              <TextField
                autoComplete='off'
                label="URL"
                value={button.url || ''}
                onChange={(value) => updateButton(index, { url: value })}
                placeholder="https://example.com"
              />
            )}

            {button.type === 'PHONE_NUMBER' && (
              <TextField
                autoComplete='off'
                label="Phone Number"
                value={button.phone_number || ''}
                onChange={(value) => updateButton(index, { phone_number: value })}
                placeholder="+1234567890"
              />
            )}
          </BlockStack>
        </React.Fragment>
      ))}

      {block.buttons && block.buttons.length > 0 && (block.buttons?.length || 0) < 2 && <Divider />}

      {(block.buttons?.length || 0) < 2 && (
        <Button
          icon={PlusIcon}
          onClick={addButton}
        >
          Add Button
        </Button>
      )}

      {(block.buttons?.length || 0) >= 2 && (
        <Text as="p" tone="subdued">
          Maximum 2 buttons allowed
        </Text>
      )}
    </BlockStack>
  );
};
