import { BlockRendererProps } from './types/RendererTypes';
import { ProductBlock, ProductItem } from '../types/product-block.type';

export function ProductBlockRenderer({ block, replaceVariables }: BlockRendererProps) {
  const productBlock = block as ProductBlock;
  const { content, styles } = productBlock;

  const renderProduct = (product: ProductItem, index: number) => {
    return (
      <div key={product.id || index} style={{
        backgroundColor: styles.backgroundColor || '#f9f9f9',
        border: styles.border || '1px solid #e1e3e5',
        borderRadius: styles.borderRadius || '8px',
        marginBottom: content.productLayout === 'list' ? '0px' : '0',
        display: 'flex',
        flexDirection: content.productLayout === 'list' ? 'row' : 'column',
        gap: '4px',
        alignItems: content.productLayout === 'list' ? 'center' : 'flex-start',
        textAlign: styles.alignment || 'left'
      }}>
        {/* Product Image */}
        <div style={{
          width: content.productLayout === 'list' ? '80px' : '100%',
          height: content.productLayout === 'list' ? '80px' : '200px',
          backgroundColor: '#e1e3e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: content.productLayout === 'list' ? '24px' : '48px',
          backgroundImage: product.imageUrl ? `url(${replaceVariables(product.imageUrl)})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0
        }}>
          {!product.imageUrl && '📦'}
        </div>

        {/* Product Info */}
        <div style={{
          padding: '12px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {content.showProductName && (
            <div style={{
              fontSize: content.productLayout === 'list' ? '16px' : '18px',
              fontWeight: 'bold',
              color: styles.color || '#333333'
            }}>
              {replaceVariables(product.name)}
            </div>
          )}

          {content.showProductPrice && (
            <div style={{
              fontSize: content.productLayout === 'list' ? '18px' : '20px',
              fontWeight: 'bold',
              color: '#007ace'
            }}>
              {replaceVariables(product.price)}
            </div>
          )}

          {content.showProductDescription && (
            <div style={{
              fontSize: '14px',
              color: '#6d7175',
              lineHeight: '1.4'
            }}>
              {replaceVariables(product.description)}
            </div>
          )}

          {content.showCTAButton && (
            <div style={{ marginTop: '12px' }}>
              <a
                href={product.productUrl}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#007ace',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {content.buttonText || 'View Product'}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  const containerStyle = {
    padding: styles.padding || '0px',
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: content.productLayout === 'grid' ? 'repeat(auto-fit, minmax(250px, 1fr))' : '1fr'
  };

  return (
    <div style={containerStyle}>
      {content.products?.map((product: ProductItem, index: number) => renderProduct(product, index)) || (
        <div style={{
          backgroundColor: styles.backgroundColor || '#f9f9f9',
          border: styles.border || '1px solid #e1e3e5',
          borderRadius: styles.borderRadius || '8px',
          padding: styles.padding || '20px',
          textAlign: 'center',
          color: '#6d7175'
        }}>
          No products to display
        </div>
      )}
    </div>
  );
}
