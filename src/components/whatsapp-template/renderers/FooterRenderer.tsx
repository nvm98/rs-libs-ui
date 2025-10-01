import React from 'react';

interface FooterRendererProps {
  block: {
    text: string;
  };
}

export const FooterRenderer: React.FC<FooterRendererProps> = ({ block }) => {
  return (
    <div style={{
      fontSize: '12px',
      color: 'rgba(255,255,255,0.6)',
      padding: '4px 8px',
      lineHeight: '16px'
    }}>
      {block.text || 'Footer text'}
    </div>
  );
};
