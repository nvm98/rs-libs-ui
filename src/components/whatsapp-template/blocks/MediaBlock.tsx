import React from 'react';
import { BlockStack, Text, TextField, Select } from '@shopify/polaris';
import { WhatsAppMediaBlock } from '../types';

interface MediaBlockProps {
  block: WhatsAppMediaBlock;
  onUpdate: (updates: Partial<WhatsAppMediaBlock>) => void;
}

const MEDIA_TYPE_OPTIONS = [
  { label: 'Image', value: 'IMAGE' },
  { label: 'Video', value: 'VIDEO' },
  { label: 'Document', value: 'DOCUMENT' },
  { label: 'Audio', value: 'AUDIO' }
];

export const MediaBlock: React.FC<MediaBlockProps> = ({ block, onUpdate }) => {
  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingSm">Media Block</Text>
      
      <Select
        label="Media Type"
        options={MEDIA_TYPE_OPTIONS}
        value={block.media_type || 'IMAGE'}
        onChange={(value) => onUpdate({ media_type: value as any })}
      />
      
      <TextField
        label="Media URL"
        value={block.media_url || ''}
        onChange={(value) => onUpdate({ media_url: value })}
        placeholder="Enter media URL"
        autoComplete="off"
      />
      
      {block.media_type !== 'AUDIO' && (
        <TextField
          label="Caption"
          value={block.caption || ''}
          onChange={(value) => onUpdate({ caption: value })}
          placeholder="Enter media caption (optional)"
          autoComplete="off"
        />
      )}
    </BlockStack>
  );
};
