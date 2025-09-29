import React from 'react';
import { BlockStack, Text, TextField, Select, Button, Card } from '@shopify/polaris';
import { WhatsAppButtonsBlock } from '../types';
import { WHATSAPP_BUTTON_TYPES } from '../constants';

interface ButtonsBlockProps {
  block: WhatsAppButtonsBlock;
  onUpdate: (updates: Partial<WhatsAppButtonsBlock>) => void;
}

export const ButtonsBlock: React.FC<ButtonsBlockProps> = ({ block, onUpdate }) => {
  const handleButtonChange = (index: number, field: string, value: string) => {
    const newButtons = [...(block.buttons || [])];
    newButtons[index] = { ...newButtons[index], [field]: value };
    onUpdate({ buttons: newButtons });
  };

  const addButton = () => {
    const newButtons = [...(block.buttons || []), { type: 'QUICK_REPLY' as const, text: '' }];
    onUpdate({ buttons: newButtons });
  };

  const removeButton = (index: number) => {
    const newButtons = [...(block.buttons || [])];
    newButtons.splice(index, 1);
    onUpdate({ buttons: newButtons });
  };

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingSm">Buttons Block</Text>
      
      <BlockStack gap="400">
        {(block.buttons || []).map((button, index) => (
          <Card key={index} padding="400">
            <BlockStack gap="300">
              <Select
                label="Button Type"
                options={WHATSAPP_BUTTON_TYPES}
                value={button.type}
                onChange={(value) => handleButtonChange(index, 'type', value)}
              />
              <TextField
                label="Button Text"
                value={button.text}
                onChange={(value) => handleButtonChange(index, 'text', value)}
                autoComplete="off"
              />
              {button.type === 'URL' && (
                <TextField
                  label="URL"
                  value={button.url || ''}
                  onChange={(value) => handleButtonChange(index, 'url', value)}
                  autoComplete="off"
                />
              )}
              {button.type === 'PHONE_NUMBER' && (
                <TextField
                  label="Phone Number"
                  value={button.phone_number || ''}
                  onChange={(value) => handleButtonChange(index, 'phone_number', value)}
                  autoComplete="off"
                />
              )}
              <Button variant="primary" tone="critical" onClick={() => removeButton(index)}>
                Remove Button
              </Button>
            </BlockStack>
          </Card>
        ))}
        <Button onClick={addButton}>Add Button</Button>
      </BlockStack>
    </BlockStack>
  );
};
