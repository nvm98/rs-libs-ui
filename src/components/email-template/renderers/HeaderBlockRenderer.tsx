import { BlockRendererProps } from './types/RendererTypes';

export function HeaderBlockRenderer({ block, replaceVariables }: BlockRendererProps) {
  const { content, styles } = block;
  
  return (
    <div style={{
      backgroundColor: styles.backgroundColor || '#ffffff',
      padding: styles.padding || '32px 24px',
      textAlign: styles.textAlign || 'center'
    }}>
      {content.showLogo && (
        <>
          <img 
            src={replaceVariables(content.logoUrl || '{{shop_logo_url}}')} 
            alt={replaceVariables(content.shopName || '{{shop_name}}')}
            style={{ 
              maxHeight: '60px', 
              maxWidth: '200px', 
              height: 'auto', 
              width: 'auto' 
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'inline-block';
            }}
          />
          <div style={{ 
            display: 'none', 
            padding: '12px 24px', 
            backgroundColor: '#6366f1', 
            color: 'white', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            fontSize: '18px' 
          }}>
            {replaceVariables(content.shopName || '{{shop_name}}')}
          </div>
        </>
      )}
    </div>
  );
}
