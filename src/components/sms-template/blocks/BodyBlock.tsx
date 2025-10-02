import React from 'react';
import { TextField } from '@shopify/polaris';
import { SMSBlock } from '../types';

interface BodyBlockProps {
  block: SMSBlock;
  onUpdate: (updates: Partial<SMSBlock>) => void;
}

export const BodyBlock: React.FC<BodyBlockProps> = ({ block, onUpdate }) => {
  const handleContentChange = (value: string) => {
    onUpdate({ content: value });
  };

  return (
    <TextField
      autoComplete='off'
      label="Body text"
      value={block.content}
      onChange={handleContentChange}
      multiline={4}
      placeholder="Enter your SMS message here..."
      helpText={`${block.content.length}/160 characters`}
    />
  );
};
