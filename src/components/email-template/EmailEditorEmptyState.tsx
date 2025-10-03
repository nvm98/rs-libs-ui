import { Box, BlockStack, Text, EmptyState } from "@shopify/polaris";
import { EmailIcon } from "@shopify/polaris-icons";
import { useMediaQuery } from "../shared/hooks/useMediaQuery";

interface EmailEditorEmptyStateProps {
  templateName?: string;
  onCreateTemplate: () => void;
}

export function EmailEditorEmptyState({
  templateName,
  onCreateTemplate,
}: EmailEditorEmptyStateProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const getTemplateName = (name?: string) => {
    if (!name) return 'Email Template';
    if (name.includes('back-to-stock')) return 'Back to Stock Email';
    if (name.includes('confirmation')) return 'Confirmation Email';
    return 'Email Template';
  };

  const getTemplateDescription = (name?: string) => {
    if (!name) return 'Create a new email template with customizable blocks';
    if (name.includes('back-to-stock')) return 'Notify customers when out-of-stock products are available again';
    if (name.includes('confirmation')) return 'Send confirmation emails to customers for their orders or subscriptions';
    return 'Create a new email template with customizable blocks';
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
          <Text as="h3" variant="headingSm" tone="subdued">Template Blocks</Text>
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
              <EmailIcon />
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

      {/* Right Panel - Email Preview */}
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
          <Text as="h3" variant="headingSm" tone="subdued">Email Preview</Text>
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
            maxWidth: '500px',
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
                      'Header with logo',
                      'Custom text blocks',
                      'Product showcases',
                      'Call-to-action buttons',
                      'Footer information',
                      'Dynamic variables'
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
