import React from 'react';

interface HeaderRendererProps {
  block: {
    format: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    text?: string;
    media_url?: string;
  };
  replaceVariables: (text: string) => string;
}

export const HeaderRenderer: React.FC<HeaderRendererProps> = ({ block, replaceVariables }) => {
  if (block.format === 'TEXT') {
    return (
      <div style={{
        fontSize: '14.2px',
        lineHeight: '19px',
        color: '#ffffff',
        fontWeight: '700',
        padding: '4px 8px'
      }}>
        {replaceVariables(block.text || 'Header Text')}
      </div>
    );
  }

  if (['IMAGE', 'VIDEO', 'DOCUMENT'].includes(block.format || '') && block.media_url) {
    return (
      <div>
        <div style={{
          width: '100%',
          height: '160px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '7.5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: block.media_url ? `url(${block.media_url})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: block.media_url ? 'transparent' : 'rgba(255,255,255,0.7)',
          fontSize: '13px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {!block.media_url && `${block.format} Preview`}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontSize: '14.2px',
      lineHeight: '19px',
      color: '#ffffff',
      fontWeight: '700',
      marginBottom: '2px'
    }}>
      Header
    </div>
  );
};
