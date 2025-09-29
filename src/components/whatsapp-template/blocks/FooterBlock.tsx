import React from 'react';
import { BlockStack, Text, TextField } from '@shopify/polaris';
import { WhatsAppFooterBlock } from '../types';

interface FooterBlockProps {
  block: WhatsAppFooterBlock;
  onUpdate: (updates: Partial<WhatsAppFooterBlock>) => void;
}

export const FooterBlock: React.FC<FooterBlockProps> = ({ block, onUpdate }) => {
  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingSm">Footer Block</Text>
      
      <TextField
        label="Footer Text"
        value={block.text || ''}
        onChange={(value) => onUpdate({ text: value })}
        placeholder="Enter footer text"
        autoComplete="off"
      />
    </BlockStack>
  );
};
