import { BlockRendererProps } from './types/RendererTypes';

export function HeaderBlockRenderer({ block, replaceVariables }: BlockRendererProps) {
  const { content, styles } = block;

  const renderWebViewLink = () => {
    if (!content.showWebViewLink) return null;
    return (
      <div style={{ textAlign: 'right', fontSize: '12px', paddingBottom: '8px' }}>
        <a href="{{view_in_browser_url}}" style={{ color: '#0000EE' }}>
          View in browser
        </a>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: content.backgroundColor || styles.backgroundColor || '#ffffff',
        padding: styles.padding || '32px 24px',
        textAlign: content.alignment || styles.textAlign || 'center',
      }}
    >
      {renderWebViewLink()}
      <a href={replaceVariables(content.logoLinkUrl || '{{shop_url}}')} target="_blank" rel="noopener noreferrer">
        <img
          src={replaceVariables(content.logoUrl || '{{shop_logo_url}}')}
          alt={replaceVariables(content.logoAltText || '{{shop_name}}')}
          style={{
            // Simplified logo styles from styles object
            width: styles.logoStyles?.width || 'auto',
            borderRadius: styles.logoStyles?.borderRadius || '0',
            padding: styles.logoStyles?.padding || '0',
            // Default styles that are no longer configurable
            maxWidth: '100%',
            height: 'auto',
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'inline-block';
          }}
        />
        <div
          style={{
            display: 'none',
            padding: '12px 24px',
            backgroundColor: '#6366f1',
            color: 'white',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
          {replaceVariables(content.logoAltText || '{{shop_name}}')}
        </div>
      </a>
    </div>
  );
}
