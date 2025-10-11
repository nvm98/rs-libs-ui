import { FooterBlock } from '../types/footer-block.type';

/**
 * Generates MJML for a FooterBlock.
 * @param block - The footer block data.
 * @returns The MJML string for the footer.
 */
export function generateFooterMjml(block: FooterBlock): string {
  const { content, styles } = block;

  const companyInfoMjml = content.companyInfo
    ? `
    <mj-text
      color="${styles.color || '#6d7175'}"
      font-size="${styles.fontSize || '12px'}"
      align="${styles.textAlign || 'center'}"
      line-height="1.6"
      padding-bottom="10px"
    >
      ${content.companyInfo.replace(/\n/g, '<br />')}
    </mj-text>
  `
    : '';

  const socialLinksMjml =
    content.socialLinks && content.socialLinks.length > 0
      ? `
    <mj-social
      font-size="12px"
      icon-size="20px"
      mode="horizontal"
      align="${styles.textAlign || 'center'}"
      padding="10px 0"
    >
      ${content.socialLinks
        .map(
          (link: { platform: string; url: any; }) =>
            `<mj-social-element name="${link.platform.toLowerCase()}" href="${link.url}"></mj-social-element>`
        )
        .join('\n')}
    </mj-social>
  `
      : '';

  const legalLinksMjml = `
    <mj-text
      color="#999999"
      font-size="11px"
      align="${styles.textAlign || 'center'}"
      padding-top="10px"
    >
      ${content.unsubscribeLink ? `<a href="${content.unsubscribeLink}" style="color: #999999; text-decoration: underline;">Unsubscribe</a>` : ''}
      ${content.unsubscribeLink && content.preferenceLink ? ' | ' : ''}
      ${content.preferenceLink ? `<a href="${content.preferenceLink}" style="color: #999999; text-decoration: underline;">Manage Preferences</a>` : ''}
    </mj-text>
  `;

  return `
    <mj-section
      background-color="${content.backgroundColor || '#ffffff'}"
      padding="${styles.padding || '24px'}"
      text-align="${styles.textAlign || 'center'}"
    >
      <mj-column>
        ${companyInfoMjml}
        ${socialLinksMjml}
        ${legalLinksMjml}
      </mj-column>
    </mj-section>
  `;
}

