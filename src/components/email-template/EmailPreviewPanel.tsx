import { Text, Button, InlineStack } from "@shopify/polaris";
import { EmailBlockRenderer} from './EmailBlockRenderer';
import { EmailBlock } from "./interfaces/email-block.interface";

interface EmailPreviewPanelProps {
  blocks: EmailBlock[];
  selectedBlockId: string | null;
  replaceVariables: (text: string) => string;
  onSave?: () => void;
  showSaveButton?: boolean;
}

export function EmailPreviewPanel({
  blocks,
  selectedBlockId,
  replaceVariables,
  onSave,
  showSaveButton = false
}: EmailPreviewPanelProps) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f6f6f7'
    }}>
      {/* Preview Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #e1e3e5',
        backgroundColor: '#ffffff'
      }}>
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h3" variant="headingSm">Preview</Text>
          {showSaveButton && onSave && (
            <Button variant="primary" onClick={onSave}>
              Save
            </Button>
          )}
        </InlineStack>
      </div>

      {/* Preview Content */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        {blocks.length > 0 ? (
          <div style={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e1e3e5',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <EmailBlockRenderer
              blocks={blocks}
              replaceVariables={replaceVariables}
              selectedBlockId={selectedBlockId}
            />
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            flexDirection: 'column',
            gap: '16px',
            color: '#6d7175'
          }}>
            <div style={{ fontSize: '64px' }}>📧</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>Email Preview</div>
              <div style={{ fontSize: '14px' }}>Add blocks to see your email template</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
