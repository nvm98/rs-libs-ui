import { EmailBlock } from '../interfaces/email-block.interface';

interface SubjectBlockRendererProps {
  block: EmailBlock;
  replaceVariables: (text: string) => string;
}

export function SubjectBlockRenderer({
  block,
  replaceVariables
}: SubjectBlockRendererProps) {
  const subjectLine = replaceVariables(block.content.subjectLine || 'Email Subject');
  const previewText = replaceVariables(block.content.previewText || '');

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '16px 20px',
      borderBottom: '1px solid #e1e3e5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#202223',
        marginBottom: previewText ? '4px' : '0',
        lineHeight: '1.4'
      }}>
        {subjectLine}
      </div>
      {previewText && (
        <div style={{
          fontSize: '13px',
          color: '#6d7175',
          lineHeight: '1.4'
        }}>
          {previewText}
        </div>
      )}
    </div>
  );
}
