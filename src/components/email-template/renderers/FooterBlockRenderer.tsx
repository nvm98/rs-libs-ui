import { BlockRendererProps } from './types/RendererTypes';

export function FooterBlockRenderer({ block, replaceVariables }: BlockRendererProps) {
  const { content, styles } = block;
  
  return (
    <div style={{
      backgroundColor: styles.backgroundColor || '#f6f6f7',
      color: styles.color || '#6d7175',
      fontSize: styles.fontSize || '14px',
      textAlign: styles.textAlign || 'center',
      padding: styles.padding || '24px',
      lineHeight: '1.4'
    }}>
      <div style={{ marginBottom: '8px' }}>
        {replaceVariables(content.text || '© 2024 {{shop_name}}. All rights reserved.')}
      </div>
      {content.unsubscribeText && (
        <div style={{ fontSize: '12px', color: '#999999' }}>
          <a href="#" style={{ color: '#999999' }}>
            {content.unsubscribeText}
          </a>
        </div>
      )}
      {content.showSocial && (
        <div style={{ marginTop: '16px' }}>
          {/* Social media links would go here */}
          <span style={{ fontSize: '12px' }}>Follow us on social media</span>
        </div>
      )}
    </div>
  );
}
