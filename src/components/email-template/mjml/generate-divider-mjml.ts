import { DividerBlock } from '../types/divider-block.type';

/**
 * Generate MJML for a DividerBlock
 * @param block - The divider block data
 * @returns The MJML string for the divider
 */
export function generateDividerMjml(block: DividerBlock): string {
  const { content, styles } = block;

  const mjml = `
    <mj-section padding="${styles.padding || '0 24px'}" margin="${styles.margin || '24px 0'}">
      <mj-column>
        <mj-divider 
          border-style="${content.lineStyle || 'solid'}" 
          border-color="${content.lineColor || '#e1e3e5'}" 
          border-width="${content.lineHeight || '1px'}" 
          width="${content.width || '80%'}"
        />
      </mj-column>
    </mj-section>
  `;

  return mjml;
}

