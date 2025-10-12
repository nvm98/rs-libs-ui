import { ButtonBlock } from '../types/button-block.type';

/**
 * Generates MJML for a ButtonBlock.
 * @param block - The button block data.
 * @returns The MJML string for the button.
 */
export function generateButtonMjml(block: ButtonBlock): string {
  const { content, styles } = block;

  return `
    <mj-button
      href="${content.linkUrl || '#'}"
      background-color="${styles.backgroundColor || '#007ace'}"
      color="${styles.textColor || '#ffffff'}"
      padding="${styles.padding || '14px 32px'}"
      border-radius="${styles.borderRadius || '6px'}"
      align="${styles.alignment || 'center'}"
      font-weight="bold"
      font-size="16px"
    >
      ${content.buttonText || 'Click Here'}
    </mj-button>
  `;
}

