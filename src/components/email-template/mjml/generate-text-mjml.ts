import { TextBlock } from '../types';

/**
 * Generates an MJML string for a TextBlock.
 * 
 * @param block - The TextBlock to convert.
 * @returns The MJML string for the text block.
 */
export function generateTextMJML(block: TextBlock): string {
  const { content, styles } = block;

  // Define section attributes, mainly for padding
  const sectionAttributes = `padding="${styles.padding || '16px 24px'}"`;

  // Define text attributes from styles
  const textAttributes = [
    `font-size="${styles.fontSize || '16px'}"`,
    `color="${styles.color || '#333333'}"`,
    `align="${styles.textAlign || 'left'}"`,
    `line-height="1.6"`,
  ].join(' ');

  // Get the text content, with a fallback
  const textContent = content.text || '';

  return `
    <mj-section ${sectionAttributes}>
      <mj-column>
        <mj-text ${textAttributes}>
          ${textContent}
        </mj-text>
      </mj-column>
    </mj-section>
  `;
}

