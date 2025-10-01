import React from 'react';
import { FormLayout, Select, TextField } from '@shopify/polaris';
import { WhatsAppHeaderBlock } from '../types';

interface HeaderBlockProps {
  block: WhatsAppHeaderBlock;
  onUpdate: (updates: Partial<WhatsAppHeaderBlock>) => void;
}

const headerTypeOptions = [
  { label: 'Text', value: 'TEXT' },
  { label: 'Image', value: 'IMAGE' },
  { label: 'Video', value: 'VIDEO' },
  { label: 'Document', value: 'DOCUMENT' }
];

export const HeaderBlock: React.FC<HeaderBlockProps> = ({ block, onUpdate }) => {
  return (
    <FormLayout>
      <Select
        label="Header Type"
        options={headerTypeOptions}
        value={block.format}
        onChange={(value) => onUpdate({ format: value as any })}
      />
      
      {block.format === 'TEXT' ? (
        <TextField
          autoComplete='off'
          label="Header Text"
          value={block.text || ''}
          onChange={(value) => onUpdate({ text: value })}
          placeholder="Header text (can include variables like {{1}})"
        />
      ) : (
        <TextField
          autoComplete='off'
          label="Media URL"
          value={block.media_url || ''}
          onChange={(value) => onUpdate({ media_url: value })}
          placeholder="URL to your media file"
        />
      )}
    </FormLayout>
  );
};
