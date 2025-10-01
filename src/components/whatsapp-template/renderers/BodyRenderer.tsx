import React from 'react';
import { WhatsAppBodyBlock } from '../types';

interface BodyRendererProps {
  block: WhatsAppBodyBlock;
}

export const BodyRenderer: React.FC<BodyRendererProps> = ({ block }) => {
  const renderTextWithVariables = (text: string) => {
    const parts = text.split(/(\{\{.*?\}\})/g);
    return parts.map((part, index) => {
      if (part.match(/(\{\{.*?\}\})/g)) {
        return (
          <span key={index} style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '1px 3px',
            borderRadius: '3px',
            fontWeight: '600'
          }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div style={{
      fontSize: '14.2px',
      lineHeight: '19px',
      color: '#ffffff',
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
      padding: '4px 8px'
    }}>
      {renderTextWithVariables(block.text || 'Body text with {{variables}}')}
    </div>
  );
};
