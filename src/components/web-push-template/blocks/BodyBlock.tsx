import React from 'react';
import { TextField } from '@shopify/polaris';
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

  return (
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
  );
};
