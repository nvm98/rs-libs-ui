import { RendererComponentProps } from './types/RendererTypes';

export function ButtonBlockRenderer({ block, replaceVariables }: RendererComponentProps) {
  const { content, styles } = block;

  // Ensure replaceVariables is defined before using it
  const processVariable = (text: string) =>
    replaceVariables ? replaceVariables(text) : text;

  return (
    <div style={{
      textAlign: styles.alignment || 'center',
      padding: '16px 24px' // Add default padding for spacing
    }}>
      <a
        href={processVariable(content.linkUrl || '#')}
        style={{
          display: 'inline-block',
          backgroundColor: styles.backgroundColor || '#007ace',
          color: styles.textColor || '#ffffff',
          textDecoration: 'none',
          padding: styles.padding || '14px 32px',
          borderRadius: styles.borderRadius || '6px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        {processVariable(content.buttonText || 'Click Here')}
      </a>
    </div>
  );
}
