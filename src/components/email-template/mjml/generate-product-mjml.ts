import { ProductBlock, ProductItem } from '../types/product-block.type';

export function generateProductMjml(block: ProductBlock): string {
  const { content, styles } = block;
  
  const renderSingleProduct = (product: ProductItem): string => {
    return `
      <mj-section background-color="${styles.backgroundColor || '#f9f9f9'}" padding="${styles.padding || '20px'}">
        <mj-column>
          <mj-table>
            <tr>
              <td style="padding: 0; vertical-align: top; width: 120px;">
                ${product.imageUrl ? `
                  <img src="${product.imageUrl}" alt="${product.name}" style="width: 100px; height: 100px; border-radius: 6px; object-fit: cover;" />
                ` : `
                  <div style="width: 100px; height: 100px; background-color: #e1e3e5; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 32px;">📦</div>
                `}
              </td>
              <td style="padding: 0 0 0 16px; vertical-align: top;">
                ${content.showProductName ? `
                  <mj-text font-size="18px" font-weight="bold" color="#333333" padding="0 0 8px 0">
                    ${product.name}
                  </mj-text>
                ` : ''}
                ${content.showProductPrice ? `
                  <mj-text font-size="20px" font-weight="bold" color="#007ace" padding="0 0 8px 0">
                    ${product.price}
                  </mj-text>
                ` : ''}
                ${content.showProductDescription ? `
                  <mj-text font-size="14px" color="#6d7175" line-height="1.4" padding="0 0 12px 0">
                    ${product.description}
                  </mj-text>
                ` : ''}
                ${content.showCTAButton ? `
                  <mj-button href="${product.productUrl}" background-color="#007ace" color="#ffffff" font-size="14px" font-weight="500" border-radius="6px" padding="10px 20px">
                    ${content.buttonText || 'View Product'}
                  </mj-button>
                ` : ''}
              </td>
            </tr>
          </mj-table>
        </mj-column>
      </mj-section>`;
  };

  const renderGridProduct = (product: ProductItem): string => {
    return `
      <mj-column width="50%" background-color="${styles.backgroundColor || '#f9f9f9'}" border="${styles.border || '1px solid #e1e3e5'}" border-radius="${styles.borderRadius || '8px'}" padding="${styles.padding || '20px'}">
        ${product.imageUrl ? `
          <mj-image src="${product.imageUrl}" alt="${product.name}" width="200px" height="200px" border-radius="6px" />
        ` : `
          <mj-text align="center" font-size="48px" padding="50px 0">📦</mj-text>
        `}
        ${content.showProductName ? `
          <mj-text font-size="16px" font-weight="bold" color="#333333" align="${styles.alignment || 'left'}" padding="8px 0 4px 0">
            ${product.name}
          </mj-text>
        ` : ''}
        ${content.showProductPrice ? `
          <mj-text font-size="18px" font-weight="bold" color="#007ace" align="${styles.alignment || 'left'}" padding="0 0 8px 0">
            ${product.price}
          </mj-text>
        ` : ''}
        ${content.showProductDescription ? `
          <mj-text font-size="14px" color="#6d7175" line-height="1.4" align="${styles.alignment || 'left'}" padding="0 0 12px 0">
            ${product.description}
          </mj-text>
        ` : ''}
        ${content.showCTAButton ? `
          <mj-button href="${product.productUrl}" background-color="#007ace" color="#ffffff" font-size="14px" font-weight="500" border-radius="6px" align="${styles.alignment || 'left'}">
            ${content.buttonText || 'View Product'}
          </mj-button>
        ` : ''}
      </mj-column>`;
  };

  const renderListProduct = (product: ProductItem): string => {
    return `
      <mj-section background-color="${styles.backgroundColor || '#f9f9f9'}" border="${styles.border || '1px solid #e1e3e5'}" border-radius="${styles.borderRadius || '8px'}" padding="${styles.padding || '20px'}" margin="0 0 16px 0">
        <mj-column width="100px">
          ${product.imageUrl ? `
            <mj-image src="${product.imageUrl}" alt="${product.name}" width="80px" height="80px" border-radius="6px" />
          ` : `
            <mj-text align="center" font-size="24px" padding="28px 0">📦</mj-text>
          `}
        </mj-column>
        <mj-column>
          ${content.showProductName ? `
            <mj-text font-size="16px" font-weight="bold" color="#333333" align="${styles.alignment || 'left'}" padding="0 0 4px 0">
              ${product.name}
            </mj-text>
          ` : ''}
          ${content.showProductPrice ? `
            <mj-text font-size="18px" font-weight="bold" color="#007ace" align="${styles.alignment || 'left'}" padding="0 0 8px 0">
              ${product.price}
            </mj-text>
          ` : ''}
          ${content.showProductDescription ? `
            <mj-text font-size="14px" color="#6d7175" line-height="1.4" align="${styles.alignment || 'left'}" padding="0 0 12px 0">
              ${product.description}
            </mj-text>
          ` : ''}
          ${content.showCTAButton ? `
            <mj-button href="${product.productUrl}" background-color="#007ace" color="#ffffff" font-size="14px" font-weight="500" border-radius="6px" align="${styles.alignment || 'left'}">
              ${content.buttonText || 'View Product'}
            </mj-button>
          ` : ''}
        </mj-column>
      </mj-section>`;
  };

  // Handle different layouts
  switch (content.productLayout) {
    case 'single':
      return content.products?.map(renderSingleProduct).join('') || '';
    
    case 'grid':
      const gridProducts = content.products || [];
      let gridMjml = '';
      for (let i = 0; i < gridProducts.length; i += 2) {
        gridMjml += `
          <mj-section padding="${styles.margin || '16px 24px'}">
            ${renderGridProduct(gridProducts[i])}
            ${gridProducts[i + 1] ? renderGridProduct(gridProducts[i + 1]) : '<mj-column width="50%"></mj-column>'}
          </mj-section>`;
      }
      return gridMjml;
    
    case 'list':
      return content.products?.map(renderListProduct).join('') || '';
    
    default:
      return content.products?.map(renderSingleProduct).join('') || '';
  }
}
