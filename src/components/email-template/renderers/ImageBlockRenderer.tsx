import { BlockRendererProps } from './types/RendererTypes';

export function ImageBlockRenderer({ block, replaceVariables }: BlockRendererProps) {
  const { content, styles } = block;
  
  return (
    <div style={{
      padding: styles.padding || '16px 24px',
      textAlign: styles.textAlign || 'center'
    }}>
      {content.link ? (
        <a href={replaceVariables(content.link)} style={{ display: 'inline-block' }}>
          <img 
            src={replaceVariables(content.src)}
            alt={content.alt || 'Image'}
            style={{
              width: styles.width || '100%',
              maxWidth: styles.maxWidth || '600px',
              height: 'auto',
              borderRadius: styles.borderRadius || '0px'
            }}
          />
        </a>
      ) : (
        <img 
          src={replaceVariables(content.src)}
          alt={content.alt || 'Image'}
          style={{
            width: styles.width || '100%',
            maxWidth: styles.maxWidth || '600px',
            height: 'auto',
            borderRadius: styles.borderRadius || '0px'
          }}
        />
      )}
    </div>
  );
}
