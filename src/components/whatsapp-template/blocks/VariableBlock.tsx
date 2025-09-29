import React from 'react';
import { BlockStack, Text, TextField } from '@shopify/polaris';
import { WhatsAppVariableBlock } from '../types';

interface VariableBlockProps {
  block: WhatsAppVariableBlock;
  onUpdate: (updates: Partial<WhatsAppVariableBlock>) => void;
}

export const VariableBlock: React.FC<VariableBlockProps> = ({ block, onUpdate }) => {
  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingSm">Variable Block</Text>
      
      <TextField
        label="Variable Name"
        value={block.variable_name || ''}
        onChange={(value) => onUpdate({ variable_name: value })}
        placeholder="Enter variable name"
        autoComplete="off"
      />
      
      <TextField
        label="Default Value"
        value={block.default_value || ''}
        onChange={(value) => onUpdate({ default_value: value })}
        placeholder="Enter default value (optional)"
        autoComplete="off"
      />
    </BlockStack>
  );
};
