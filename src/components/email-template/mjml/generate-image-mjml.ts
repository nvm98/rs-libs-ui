import { ImageBlock } from '../types/image-block.type';

/**
 * Generate MJML code for ImageBlock
 * @param block - ImageBlock data
 * @param replaceVariables - Function to replace variables in content
 * @returns MJML string for the image block
 */
export function generateImageMjml(
  block: ImageBlock,
  replaceVariables?: (text: string) => string
): string {
  const { content, styles } = block;
  
  // Process content with variable replacement if function is provided
  const imageUrl = replaceVariables ? replaceVariables(content.imageUrl) : content.imageUrl;
  const altText = content.altText || 'Image';
  const linkUrl = content.linkUrl ? (replaceVariables ? replaceVariables(content.linkUrl) : content.linkUrl) : '';
  const caption = content.caption ? (replaceVariables ? replaceVariables(content.caption) : content.caption) : '';
  
  // Process styles
  const width = styles.width || '100%';
  const alignment = styles.alignment || 'center';
  const padding = styles.padding || '16px 24px';
  
  // Build MJML structure
  let mjmlContent = `
    <mj-section padding="${padding}">
      <mj-column>`;

  // Add image with optional link
  if (linkUrl) {
    mjmlContent += `
        <mj-image
          src="${imageUrl}"
          alt="${altText}"
          width="${width}"
          align="${alignment}"
          href="${linkUrl}"
        />`;
  } else {
    mjmlContent += `
        <mj-image
          src="${imageUrl}"
          alt="${altText}"
          width="${width}"
          align="${alignment}"
        />`;
  }

  // Add caption if provided
  if (caption) {
    mjmlContent += `
        <mj-text
          align="${alignment}"
          font-size="14px"
          color="#666666"
          font-style="italic"
          padding-top="8px"
        >
          ${caption}
        </mj-text>`;
  }

  mjmlContent += `
      </mj-column>
    </mj-section>`;

  return mjmlContent;
}
