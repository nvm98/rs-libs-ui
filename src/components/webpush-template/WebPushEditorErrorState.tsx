import { Box, BlockStack, Text, Button } from "@shopify/polaris";
import { RefreshIcon, AlertTriangleIcon } from "@shopify/polaris-icons";
import { useTranslation } from "react-i18next";

interface WebPushEditorErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function WebPushEditorErrorState({
  error,
  onRetry
}: WebPushEditorErrorStateProps) {
  const { t } = useTranslation('webpush-template');
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar - Error */}
      <div style={{
        width: '320px',
        borderRight: '1px solid #e1e3e5',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        position: 'relative'
      }}>
        {/* Settings Header */}
        <Box padding={'400'}>
          <Text as="h3" variant="headingSm" tone="subdued">{t('errorState.templateBlocksTitle')}</Text>
        </Box>

        {/* Error blocks list */}
        <div style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BlockStack gap="300" align="center">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#fef2f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangleIcon />
            </div>
            <BlockStack gap="100" align="center">
              <Text as="p" variant="bodyMd" tone="critical" alignment="center">
                {t('errorState.failedToLoad')}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued" alignment="center">
                {t('errorState.unableToLoadBlocks')}
              </Text>
            </BlockStack>
          </BlockStack>
        </div>
      </div>

      {/* Right Panel - Error Preview */}
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
          <Text as="h3" variant="headingSm" tone="subdued">Web Push Preview</Text>
        </div>

        {/* Error State Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            maxWidth: '500px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <BlockStack gap="500" align="center">
              {/* Error Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#fef2f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ef4444'
              }}>
                <div style={{ fontSize: '32px', color: '#ef4444' }}>
                  <AlertTriangleIcon />
                </div>
              </div>

              {/* Content */}
              <BlockStack gap="300" align="center">
                <Text as="h2" variant="headingLg">
                  Something went wrong
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
                  We couldn't load your web push template. This might be a temporary issue.
                </Text>
                {error && (
                  <div style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    padding: '12px',
                    maxWidth: '100%'
                  }}>
                    <Text as="p" variant="bodySm" tone="critical" alignment="center">
                      {error}
                    </Text>
                  </div>
                )}
              </BlockStack>

              {/* Action Button */}
              <Button
                variant="primary"
                size="large"
                icon={RefreshIcon}
                onClick={onRetry}
              >
                Try Again
              </Button>

              {/* Help Text */}
              <Text as="p" variant="bodySm" tone="subdued" alignment="center">
                If the problem persists, please contact support
              </Text>
            </BlockStack>
          </div>
        </div>
      </div>
    </div>
  );
}
