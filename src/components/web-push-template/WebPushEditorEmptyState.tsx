import { Box, BlockStack, Text, EmptyState } from "@shopify/polaris";
import { useWebPushMediaQuery } from "./hooks";
import { NotificationIcon } from "@shopify/polaris-icons";

interface WebPushEditorEmptyStateProps {
  templateName?: string;
  onCreateTemplate: () => void;
}

export function WebPushEditorEmptyState({
  templateName,
  onCreateTemplate,
}: WebPushEditorEmptyStateProps) {
  const isMobile = useWebPushMediaQuery('(max-width: 768px)');

  const getTemplateName = (name?: string) => {
    if (!name) return 'Web Push Template';
    if (name.includes('back-to-stock')) return 'Back to Stock Notification';
    if (name.includes('confirmation')) return 'Confirmation Notification';
    return 'Web Push Template';
  };

  const getTemplateDescription = (name?: string) => {
    if (!name) return 'Create a new web push notification template with customizable content';
    if (name.includes('back-to-stock')) return 'Notify customers via web push when out-of-stock products are available again';
    if (name.includes('confirmation')) return 'Send web push confirmations to customers for their orders or subscriptions';
    return 'Create a new web push notification template with customizable content';
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar - Empty */}
      {!isMobile && (
        <div style={{
          width: '319px',
          minWidth: '319px',
          maxWidth: '319px',
          borderRight: '1px solid #e1e3e5',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          position: 'relative'
        }}>
        {/* Settings Header */}
        <Box padding={'400'}>
          <Text as="h3" variant="headingSm" tone="subdued">Settings</Text>
        </Box>

        {/* Empty blocks list */}
        <div style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BlockStack gap="300" align="center" inlineAlign="center">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#f6f6f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <NotificationIcon />
            </div>
            <BlockStack gap="100" align="center">
              <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
                No blocks yet
              </Text>
              <Text as="p" variant="bodySm" tone="subdued" alignment="center">
                Create your first template to get started
              </Text>
            </BlockStack>
          </BlockStack>
        </div>
      </div>
      )}

      {/* Right Panel - Web Push Preview */}
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

        {/* Empty State Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            borderRadius: '12px',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
            <BlockStack gap="200" align="center">
              <EmptyState
                heading={getTemplateName(templateName)}
                action={{
                  content: 'Create template',
                  onAction: onCreateTemplate,
                }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>
                  {getTemplateDescription(templateName)}
                </p>
              </EmptyState>

              {/* Features */}
              <div style={{ width: '100%' }}>
                <BlockStack gap="200">
                  <Text as="h4" variant="headingSm" alignment="center">
                    What you can create:
                  </Text>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    textAlign: 'left'
                  }}>
                    {[
                      'Custom titles',
                      'Rich body text',
                      'Brand icons',
                      'Action buttons',
                      'Dynamic variables',
                      'Personalization'
                    ].map((feature, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#007ace'
                        }} />
                        <Text as="span" variant="bodySm">
                          {feature}
                        </Text>
                      </div>
                    ))}
                  </div>
                </BlockStack>
              </div>

              {/* Help Text */}
              <Text as="p" variant="bodySm" tone="subdued" alignment="center">
                You can always customize and modify your template later
              </Text>
            </BlockStack>
          </div>
        </div>
      </div>
    </div>
  );
}
