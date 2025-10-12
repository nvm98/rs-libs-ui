import { EmailBlock } from './interfaces/email-block.interface';
import {
  SubjectBlockRenderer,
  HeaderBlockRenderer,
  TextBlockRenderer,
  ImageBlockRenderer,
  ButtonBlockRenderer,
  ProductBlockRenderer,
  DividerBlockRenderer,
  SpacerBlockRenderer,
  FooterBlockRenderer
} from './renderers';

interface EmailBlockRendererProps {
  blocks: EmailBlock[];
  selectedBlockId?: string | null;
  replaceVariables: (text: string) => string;
}

export function EmailBlockRenderer({
  blocks,
  selectedBlockId = null,
  replaceVariables,
}: EmailBlockRendererProps) {
  // Find subject block to get subject line and preview text
  const subjectBlock = blocks.find(block => block.type === 'subject');
  const subjectLine = subjectBlock ?
    replaceVariables(subjectBlock.content.subjectLine || 'Your order update') :
    replaceVariables('Your order update');
  const previewText = subjectBlock ?
    replaceVariables(subjectBlock.content.previewText || '') :
    '';

  // Filter out subject block from main content rendering
  const contentBlocks = blocks.filter(block => block.type !== 'subject');

  return (
    <div style={{
      backgroundColor: '#f6f6f7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Email Header Info */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '12px',
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '8px 8px 0 0'
      }}>
        <div style={{ fontSize: '13px', color: '#6d7175', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '6px' }}>
            <strong>From:</strong> {replaceVariables('{{shop_name}}')} &lt;noreply@{replaceVariables('{{shop_domain}}')} &gt;
          </div>
          <div style={{ marginBottom: '6px' }}>
            <strong>To:</strong> {replaceVariables('{{customer_email}}')}
          </div>
          <div style={{ marginBottom: previewText ? '6px' : '0' }}>
            <strong>Subject:</strong> {subjectLine}
          </div>
          {previewText && (
            <div style={{ color: '#8b8b8b', fontStyle: 'italic' }}>
              <strong>Preview Text:</strong> {previewText}
            </div>
          )}
        </div>
      </div>

      {/* Main Email Content */}
      <div style={{
        backgroundColor: '#ffffff',
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden'
      }}>
        {contentBlocks.map((block) => (
          <div
            key={block.id}
            style={{
              position: 'relative',
              outline: selectedBlockId === block.id ? '2px solid #007ace' : 'none',
              outlineOffset: selectedBlockId === block.id ? '2px' : '0',
              transition: 'outline 0.2s ease'
            }}
          >
            <BlockComponent
              block={block}
              replaceVariables={replaceVariables}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Individual Block Component
function BlockComponent({
  block,
  replaceVariables
}: {
  block: EmailBlock;
  replaceVariables: (text: string) => string;
}) {
  // Handle each block type explicitly to ensure proper typing
  switch (block.type) {
    case 'subject':
      return <SubjectBlockRenderer block={block} replaceVariables={replaceVariables} />;
    case 'header':
      return <HeaderBlockRenderer block={block} replaceVariables={replaceVariables} />;
    case 'text':
      return <TextBlockRenderer block={block} replaceVariables={replaceVariables} />;
    case 'image':
      return <ImageBlockRenderer block={block} replaceVariables={replaceVariables} />;
    case 'button':
      return <ButtonBlockRenderer block={block} replaceVariables={replaceVariables} />;
    case 'product':
      return <ProductBlockRenderer block={block} replaceVariables={replaceVariables} />;
    case 'footer':
      return <FooterBlockRenderer block={block} replaceVariables={replaceVariables} />;
    case 'divider':
      return <DividerBlockRenderer block={block} replaceVariables={replaceVariables} />;
    case 'spacer':
      return <SpacerBlockRenderer block={block} />;
    default:
      return null;
  }
}