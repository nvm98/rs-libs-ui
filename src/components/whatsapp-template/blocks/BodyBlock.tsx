import React from 'react';
import { TextField } from '@shopify/polaris';
import { WhatsAppBodyBlock } from '../types';

interface BodyBlockProps {
  block: WhatsAppBodyBlock;
  onUpdate: (updates: Partial<WhatsAppBodyBlock>) => void;
}

export const BodyBlock: React.FC<BodyBlockProps> = ({ block, onUpdate }) => {
  return (
    <TextField
      autoComplete='off'
      label="Body Text"
      value={block.text}
      onChange={(value) => onUpdate({ text: value })}
      multiline={4}
      placeholder="Your message text. Use {{1}}, {{2}}, etc. for variables"
      helpText="This is the main content of your message. Variables like {{1}} will be replaced with actual values when sent."
    />
  );
};
