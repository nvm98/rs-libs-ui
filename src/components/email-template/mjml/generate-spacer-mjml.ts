import { SpacerBlock } from '../types/spacer-block.type';

/**
 * Generate MJML for a SpacerBlock
 * @param block - The spacer block data
 * @returns The MJML string for the spacer
 */
export function generateSpacerMjml(block: SpacerBlock): string {
  const { content } = block;

  const mjml = `
    <mj-spacer 
      height="${content.height || '32px'}" 
      container-background-color="${content.backgroundColor || 'transparent'}"
    />
  `;

  return mjml;
}

