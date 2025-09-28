import { BlockRendererProps } from './types/RendererTypes';

export function ProductBlockRenderer({ block, replaceVariables }: BlockRendererProps) {
  const { content, styles } = block;
  
  return (
    <div style={{
      backgroundColor: styles.backgroundColor || '#f9f9f9',
      border: styles.border || '1px solid #e1e3e5',
      borderRadius: styles.borderRadius || '8px',
      padding: styles.padding || '20px',
      margin: styles.margin || '16px 24px'
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {content.showImage && (
          <div style={{ 
            width: '80px', 
            height: '80px', 
            backgroundColor: '#e1e3e5', 
            borderRadius: '6px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '24px' 
          }}>
            📦
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#333333', 
            marginBottom: content.showPrice ? '4px' : '0' 
          }}>
            {replaceVariables('{{product_name}}')}
          </div>
          {content.showPrice && (
            <div style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#007ace' 
            }}>
              {replaceVariables('{{product_price}}')}
            </div>
          )}
          {content.showDescription && (
            <div style={{ 
              fontSize: '14px', 
              color: '#6d7175',
              marginTop: '8px'
            }}>
              {replaceVariables('{{product_description}}')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
