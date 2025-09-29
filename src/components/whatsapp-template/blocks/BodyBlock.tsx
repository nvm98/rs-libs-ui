import React from 'react';
import { BlockStack, Text, TextField } from '@shopify/polaris';
import { WhatsAppBodyBlock } from '../types';

interface BodyBlockProps {
  block: WhatsAppBodyBlock;
  onUpdate: (updates: Partial<WhatsAppBodyBlock>) => void;
}

export const BodyBlock: React.FC<BodyBlockProps> = ({ block, onUpdate }) => {
  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingSm">Body Block</Text>
      
      <TextField
        label="Body Text"
        value={block.text || ''}
        onChange={(value) => onUpdate({ text: value })}
        multiline={5}
        placeholder="Enter body text. Use {{1}}, {{2}} for variables."
        autoComplete="off"
      />
      
      {block.variables && block.variables.length > 0 && (
        <Text as="p" variant="bodyMd" tone="subdued">
          Variables: {block.variables.join(', ')}
        </Text>
      )}
    </BlockStack>
  );
};
