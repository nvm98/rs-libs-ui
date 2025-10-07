import React from 'react';
import { TextField, BlockStack } from '@shopify/polaris';
import { WebPushBlock } from '../types';
import { MAX_BODY_LENGTH } from '../constants';

interface BodyBlockProps {
  block: WebPushBlock;
  onUpdate: (updates: Partial<WebPushBlock>) => void;
}

export const BodyBlock: React.FC<BodyBlockProps> = ({ block, onUpdate }) => {
  const handleContentChange = (value: string) => {
    onUpdate({ content: value });
  };

  const handleImageChange = (value: string) => {
    onUpdate({ image: value });
  };

  return (
    <BlockStack gap="300">
      <TextField
        autoComplete='off'
        label="Notification body"
        value={block.content}
        onChange={handleContentChange}
        multiline={3}
        placeholder="Enter notification body text..."
        helpText={`${block.content.length}/${MAX_BODY_LENGTH} characters`}
        error={block.content.length > MAX_BODY_LENGTH ? 'Body is too long' : undefined}
      />
      <TextField
        autoComplete='off'
        label="Image URL (optional)"
        value={block.image || ''}
        onChange={handleImageChange}
        placeholder="https://example.com/image.jpg"
        helpText="Add an image to display with the notification"
      />
    </BlockStack>
  );
};
