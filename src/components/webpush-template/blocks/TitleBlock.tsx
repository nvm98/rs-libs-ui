import React from 'react';
import { TextField } from '@shopify/polaris';
import { WebPushBlock } from '../types';
import { MAX_TITLE_LENGTH } from '../constants';

interface TitleBlockProps {
  block: WebPushBlock;
  onUpdate: (updates: Partial<WebPushBlock>) => void;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({ block, onUpdate }) => {
  const handleContentChange = (value: string) => {
    onUpdate({ content: value });
  };

  return (
    <TextField
      autoComplete='off'
      label="Notification title"
      value={block.content}
      onChange={handleContentChange}
      placeholder="Enter notification title..."
      helpText={`${block.content.length}/${MAX_TITLE_LENGTH} characters`}
      error={block.content.length > MAX_TITLE_LENGTH ? 'Title is too long' : undefined}
    />
  );
};
