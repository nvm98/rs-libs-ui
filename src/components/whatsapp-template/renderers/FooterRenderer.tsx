import React from 'react';

interface FooterRendererProps {
  block: {
    text: string;
  };
  replaceVariables: (text: string) => string;
}

export const FooterRenderer: React.FC<FooterRendererProps> = ({ block, replaceVariables }) => {
  return (
    <div style={{
      fontSize: '12px',
      color: 'rgba(255,255,255,0.6)',
      padding: '4px 8px',
      lineHeight: '16px'
    }}>
      {replaceVariables(block.text || 'Footer text')}
    </div>
  );
};
