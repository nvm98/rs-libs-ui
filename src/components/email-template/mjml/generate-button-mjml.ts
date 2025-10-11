import { ButtonBlock } from '../types/button-block.type';

/**
 * Generates MJML for a ButtonBlock.
 * @param block - The button block data.
 * @returns The MJML string for the button.
 */
export function generateButtonMjml(block: ButtonBlock): string {
  const { content } = block;

  return `
    <mj-button
      href="${content.linkUrl || '#'}"
      background-color="${content.backgroundColor || '#007ace'}"
      color="${content.textColor || '#ffffff'}"
      padding="${content.padding || '14px 32px'}"
      border-radius="${content.borderRadius || '6px'}"
      align="${content.alignment || 'center'}"
      font-weight="bold"
      font-size="16px"
    >
      ${content.buttonText || 'Click Here'}
    </mj-button>
  `;
}

