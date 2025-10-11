import { EmailBlockType, HeaderBlock, TextBlock } from '../types';
import { generateMJML } from './generate-mjml';

// Example usage and testing
const sampleBlocks = [
  // Header block
  {
    id: 'header-1',
    type: EmailBlockType.HEADER,
    content: {
      logoUrl: 'https://example.com/logo.png',
      logoAltText: 'Company Logo',
      logoLinkUrl: 'https://example.com',
      backgroundColor: '#f8f9fa',
      showWebViewLink: true,
      alignment: 'center' as const,
    },
    styles: {
      backgroundColor: '#f8f9fa',
      padding: '32px 24px',
      textAlign: 'center' as const,
      logoStyles: {
        width: '200px',
        borderRadius: '8px',
        padding: '0',
      },
    },
  } as HeaderBlock,

  // Text block
  {
    id: 'text-1',
    type: EmailBlockType.TEXT,
    content: {
      text: 'Welcome to our newsletter! This is a sample text block that demonstrates how text content is rendered in MJML format.',
    },
    styles: {
      fontSize: '18px',
      color: '#333333',
      textAlign: 'left' as const,
      padding: '24px',
    },
  } as TextBlock,

  // Another text block with different styling
  {
    id: 'text-2',
    type: EmailBlockType.TEXT,
    content: {
      text: 'This is another text block with center alignment and different styling to show the flexibility of the text block generator.',
    },
    styles: {
      fontSize: '16px',
      color: '#666666',
      textAlign: 'center' as const,
      padding: '16px 24px',
    },
  } as TextBlock,
];

// Generate MJML
const mjmlOutput = generateMJML(sampleBlocks);

console.log('Generated MJML:');
console.log(mjmlOutput);

// Export for use in other files
export { sampleBlocks, mjmlOutput };
