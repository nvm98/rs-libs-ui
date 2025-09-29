import React from 'react';
import { BlockStack, Text, TextField, Select } from '@shopify/polaris';
import { WhatsAppHeaderBlock } from '../types';
import { WHATSAPP_HEADER_FORMATS } from '../constants';

interface HeaderBlockProps {
  block: WhatsAppHeaderBlock;
  onUpdate: (updates: Partial<WhatsAppHeaderBlock>) => void;
}

export const HeaderBlock: React.FC<HeaderBlockProps> = ({ block, onUpdate }) => {
  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingSm">Header Block</Text>
      
      <Select
        label="Header Format"
        options={WHATSAPP_HEADER_FORMATS}
        value={block.format || 'TEXT'}
        onChange={(value) => onUpdate({ format: value as any })}
      />
      
      {block.format === 'TEXT' && (
        <TextField
          label="Header Text"
          value={block.text || ''}
          onChange={(value) => onUpdate({ text: value })}
          placeholder="Enter header text"
          autoComplete="off"
        />
      )}
      
      {['IMAGE', 'VIDEO', 'DOCUMENT'].includes(block.format || '') && (
        <TextField
          label="Media URL"
          value={block.media_url || ''}
          onChange={(value) => onUpdate({ media_url: value })}
          placeholder="Enter media URL"
          autoComplete="off"
        />
      )}
    </BlockStack>
  );
};
