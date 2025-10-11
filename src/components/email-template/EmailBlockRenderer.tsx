import { EmailBlock } from './interfaces/email-block.interface';
import {
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
          <div>
            <strong>Subject:</strong> {replaceVariables('Your order update')}
          </div>
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
        {blocks.map((block, index) => (
          <div
            key={block.id}
            style={{
              marginBottom: index < blocks.length - 1 ? '20px' : '0',
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