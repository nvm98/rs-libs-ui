import React from 'react';
import { TextField } from '@shopify/polaris';
import { WhatsAppFooterBlock } from '../types';

interface FooterBlockProps {
  block: WhatsAppFooterBlock;
  onUpdate: (updates: Partial<WhatsAppFooterBlock>) => void;
}

export const FooterBlock: React.FC<FooterBlockProps> = ({ block, onUpdate }) => {
  return (
    <TextField
      autoComplete='off'
      label="Footer Text"
      value={block.text}
      onChange={(value) => onUpdate({ text: value })}
      placeholder="Footer text (no variables allowed)"
      helpText="Footer text is static and cannot contain variables"
    />
  );
};
