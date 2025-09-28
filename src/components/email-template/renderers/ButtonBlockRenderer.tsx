import { BlockRendererProps } from './types/RendererTypes';

export function ButtonBlockRenderer({ block, replaceVariables }: BlockRendererProps) {
  const { content, styles } = block;
  
  return (
    <div style={{
      textAlign: styles.textAlign || 'center',
      margin: styles.margin || '16px 24px'
    }}>
      <a 
        href={content.variables ? replaceVariables(content.link) : content.link}
        style={{
          display: 'inline-block',
          backgroundColor: styles.backgroundColor || '#007ace',
          color: styles.color || '#ffffff',
          textDecoration: 'none',
          padding: styles.padding || '14px 32px',
          borderRadius: styles.borderRadius || '6px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        {content.variables ? replaceVariables(content.text) : content.text}
      </a>
    </div>
  );
}
