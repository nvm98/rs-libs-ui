import React from 'react';
import { WhatsAppBodyBlock } from '../types';

interface BodyRendererProps {
  block: WhatsAppBodyBlock;
  replaceVariables: (text: string) => string;
}

export const BodyRenderer: React.FC<BodyRendererProps> = ({ block, replaceVariables }) => {
  return (
    <div style={{
      fontSize: '14.2px',
      lineHeight: '19px',
      color: '#ffffff',
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
      padding: '4px 8px'
    }}>
      {replaceVariables(block.text || 'Body text with {{variables}}')}
    </div>
  );
};
