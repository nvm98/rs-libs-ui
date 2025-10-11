import { RendererComponentProps } from './types/RendererTypes';

export function ButtonBlockRenderer({ block, replaceVariables }: RendererComponentProps) {
  const { content } = block;

  // Ensure replaceVariables is defined before using it
  const processVariable = (text: string) =>
    replaceVariables ? replaceVariables(text) : text;

  return (
    <div style={{
      textAlign: content.alignment || 'center',
      padding: '16px 24px' // Add default padding for spacing
    }}>
      <a
        href={processVariable(content.linkUrl || '#')}
        style={{
          display: 'inline-block',
          backgroundColor: content.backgroundColor || '#007ace',
          color: content.textColor || '#ffffff',
          textDecoration: 'none',
          padding: content.padding || '14px 32px',
          borderRadius: content.borderRadius || '6px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        {processVariable(content.buttonText || 'Click Here')}
      </a>
    </div>
  );
}
