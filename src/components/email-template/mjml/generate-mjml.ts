import { EmailBlock } from '@email-template/interfaces';
import { EmailBlockType, HeaderBlock, TextBlock, ImageBlock, ProductBlock, DividerBlock, SpacerBlock, ButtonBlock, FooterBlock } from '../types';
import { generateHeaderMJML } from './generate-header-mjml';
import { generateTextMJML } from './generate-text-mjml';
import { generateImageMjml } from './generate-image-mjml';
import { generateProductMjml } from './generate-product-mjml';
import { generateDividerMjml } from './generate-divider-mjml';
import { generateSpacerMjml } from './generate-spacer-mjml';
import { generateButtonMjml } from './generate-button-mjml';
import { generateFooterMjml } from './generate-footer-mjml';

/**
 * Generates a full MJML document from an array of email blocks.
 * This function iterates through a list of blocks and calls the appropriate
 * MJML generator for each block type.
 *
 * @param blocks - An array of EmailBlock objects.
 * @returns The complete MJML string.
 */
export function generateMJML(blocks: EmailBlock[]): string {
  const blockMjml = blocks
    .map((block) => {
      switch (block.type) {
        case EmailBlockType.HEADER:
          return generateHeaderMJML(block as HeaderBlock);
        case EmailBlockType.TEXT:
          return generateTextMJML(block as TextBlock);
        case EmailBlockType.IMAGE:
          return generateImageMjml(block as ImageBlock);
        case EmailBlockType.PRODUCT:
          return generateProductMjml(block as ProductBlock);
        case EmailBlockType.DIVIDER:
          return generateDividerMjml(block as DividerBlock);
        case EmailBlockType.SPACER:
          return generateSpacerMjml(block as SpacerBlock);
        case EmailBlockType.BUTTON:
          return generateButtonMjml(block as ButtonBlock);
        case EmailBlockType.FOOTER:
          return generateFooterMjml(block as FooterBlock);
        default:
          console.warn(`MJML generation for block type "${block.type}" is not yet supported.`);
          return `<!-- Block type ${block.type} not yet supported -->`;
      }
    })
    .join('\n');

  return `
<mjml>
  <mj-head>
    <mj-title>Your Email</mj-title>
    <mj-preview>Your email preview.</mj-preview>
    <mj-attributes>
      <mj-all font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" />
      <mj-text font-size="16px" color="#333333" line-height="1.5" />
      <mj-section padding="0px" />
    </mj-attributes>
  </mj-head>
  <mj-body>
    ${blockMjml}
  </mj-body>
</mjml>
  `;
}

