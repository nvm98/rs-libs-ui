import { Text, Button, InlineStack, Spinner, Banner, ButtonGroup } from "@shopify/polaris";
import { EmailBlockRenderer} from './EmailBlockRenderer';
import { EmailBlock } from "./interfaces/email-block.interface";
import { useState } from "react";
import { DesktopIcon, MobileIcon } from "@shopify/polaris-icons";

type PreviewMode = 'desktop' | 'mobile';

interface EmailPreviewPanelProps {
  blocks: EmailBlock[];
  selectedBlockId: string | null;
  replaceVariables: (text: string) => string;
  onSave?: () => void;
  showSaveButton?: boolean;
  loading?: boolean;
  error?: string | null;
}

export function EmailPreviewPanel({
  blocks,
  selectedBlockId,
  replaceVariables,
  onSave,
  showSaveButton = false,
  loading = false,
  error = null
}: EmailPreviewPanelProps) {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f6f6f7',
      position: 'relative',
    }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <Spinner accessibilityLabel="Saving..." size="large" />
        </div>
      )}
      {/* Preview Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #e1e3e5',
        backgroundColor: '#ffffff'
      }}>
        <InlineStack align="space-between" blockAlign="center" gap="400">
          <Text as="h3" variant="headingSm">Preview</Text>
          <InlineStack gap="200" blockAlign="center">
            {error && (
              <Banner tone="critical" onDismiss={() => {}}>
                {error}
              </Banner>
            )}
            <ButtonGroup variant="segmented">
              <Button
                pressed={previewMode === 'desktop'}
                onClick={() => setPreviewMode('desktop')}
                icon={DesktopIcon}
              />
              <Button
                pressed={previewMode === 'mobile'}
                onClick={() => setPreviewMode('mobile')}
                icon={MobileIcon}
              />
            </ButtonGroup>
            {showSaveButton && onSave && (
              <Button variant="primary" onClick={onSave} loading={loading}>
                Save
              </Button>
            )}
          </InlineStack>
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
            maxWidth: previewMode === 'mobile' ? '375px' : '600px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e1e3e5',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'max-width 0.3s ease'
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
