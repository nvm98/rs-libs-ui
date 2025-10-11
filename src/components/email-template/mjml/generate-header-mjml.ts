import { HeaderBlock } from '../types';

/**
 * Generates MJML string for a HeaderBlock.
 * This function converts a HeaderBlock into its corresponding MJML representation
 * matching the current preview rendering logic.
 * 
 * @param block - The HeaderBlock to convert to MJML
 * @returns The MJML string representation of the header block
 */
export function generateHeaderMJML(block: HeaderBlock): string {
  const { content, styles } = block;

  // Determine background color - content.backgroundColor takes precedence over styles.backgroundColor
  const backgroundColor = content.backgroundColor || styles.backgroundColor || '#ffffff';
  
  // Section padding
  const sectionPadding = styles.padding || '32px 24px';
  
  // Text alignment - content.alignment takes precedence over styles.textAlign
  const alignment = content.alignment || styles.textAlign || 'center';

  // Build section attributes
  const sectionAttributes = [
    `background-color="${backgroundColor}"`,
    `padding="${sectionPadding}"`,
  ].join(' ');

  // Generate web view link if enabled
  const webViewLink = content.showWebViewLink
    ? `
        <mj-text align="right" font-size="12px" padding-bottom="8px" color="#0000EE">
          <a href="{{view_in_browser_url}}" style="color: inherit; text-decoration: none;">
            View in browser
          </a>
        </mj-text>`
    : '';

  // Logo URL with fallback
  const logoUrl = content.logoUrl || '{{shop_logo_url}}';
  
  // Logo alt text with fallback
  const logoAltText = content.logoAltText || '{{shop_name}}';
  
  // Logo link URL with fallback
  const logoLinkUrl = content.logoLinkUrl || '{{shop_url}}';

  // Logo styles
  const logoWidth = styles.logoStyles?.width || 'auto';
  const logoBorderRadius = styles.logoStyles?.borderRadius || '0';
  const logoPadding = styles.logoStyles?.padding || '0';

  // Build image attributes
  const imageAttributes = [
    `align="${alignment}"`,
    `src="${logoUrl}"`,
    `alt="${logoAltText}"`,
    `href="${logoLinkUrl}"`,
    logoWidth !== 'auto' ? `width="${logoWidth.replace('px', '')}"` : '',
    `border-radius="${logoBorderRadius}"`,
    logoPadding !== '0' ? `padding="${logoPadding}"` : '',
    'target="_blank"',
  ].filter(Boolean).join(' ');

  return `
    <mj-section ${sectionAttributes}>
      <mj-column>${webViewLink}
        <mj-image ${imageAttributes} />
      </mj-column>
    </mj-section>`;
}

/**
 * Generates a complete MJML document with just a header block.
 * Useful for testing or when you only need a header.
 * 
 * @param block - The HeaderBlock to convert
 * @returns Complete MJML document string
 */
export function generateHeaderMJMLDocument(block: HeaderBlock): string {
  const headerMjml = generateHeaderMJML(block);
  
  return `<mjml>
  <mj-head>
    <mj-title>Email Header</mj-title>
    <mj-preview></mj-preview>
    <mj-attributes>
      <mj-all font-family="Arial, sans-serif" />
    </mj-attributes>
  </mj-head>
  <mj-body>
    ${headerMjml}
  </mj-body>
</mjml>`;
}
