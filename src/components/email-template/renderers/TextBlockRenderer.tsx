import { BlockRendererProps } from './types/RendererTypes';

export function TextBlockRenderer({ block, replaceVariables }: BlockRendererProps) {
  const { content, styles } = block;

  return (
    <div style={{
      fontSize: styles.fontSize || '16px',
      color: styles.color || '#333333',
      textAlign: styles.textAlign || 'left',
      padding: styles.padding || '16px 24px',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap'
    }}>
      {replaceVariables ? replaceVariables(content.text) : content.text}
    </div>
  );
}
