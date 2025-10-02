import { Box, BlockStack, Text, Button } from "@shopify/polaris";
import { useMediaQuery } from "./hooks";
import { PlusCircleIcon, ChatIcon } from "@shopify/polaris-icons";

interface WhatsAppEditorEmptyStateProps {
  templateName?: string;
  onCreateTemplate: () => void;
}

export function WhatsAppEditorEmptyState({
  templateName,
  onCreateTemplate,
}: WhatsAppEditorEmptyStateProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const getTemplateName = (name?: string) => {
    if (!name) return 'WhatsApp Template';
    if (name.includes('back-to-stock')) return 'Back to Stock WhatsApp';
    if (name.includes('confirmation')) return 'Confirmation WhatsApp';
    return 'WhatsApp Template';
  };

  const getTemplateDescription = (name?: string) => {
    if (!name) return 'Create a new WhatsApp template with customizable blocks';
    if (name.includes('back-to-stock')) return 'Notify customers via WhatsApp when out-of-stock products are available again';
    if (name.includes('confirmation')) return 'Send WhatsApp confirmations to customers for their orders or subscriptions';
    return 'Create a new WhatsApp template with customizable blocks';
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar - Empty */}
      {!isMobile && (
        <div style={{
          width: '400px',
          minWidth: '400px',
          maxWidth: '400px',
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
          <BlockStack gap="300" align="center">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#f6f6f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ChatIcon />
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

      {/* Right Panel - WhatsApp Preview */}
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
          <Text as="h3" variant="headingSm" tone="subdued">WhatsApp Preview</Text>
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
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            maxWidth: '500px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <BlockStack gap="500" align="center">
              {/* Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#e8f5e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #25d366'
              }}>
                <div style={{ fontSize: '32px', color: '#25d366' }}>
                  <ChatIcon />
                </div>
              </div>

              {/* Content */}
              <BlockStack gap="300" align="center">
                <Text as="h2" variant="headingLg">
                  {getTemplateName(templateName)}
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
                  {getTemplateDescription(templateName)}
                </Text>
              </BlockStack>

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
                      'Header messages',
                      'Rich text formatting',
                      'Media attachments',
                      'Action buttons',
                      'Footer text',
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
                          backgroundColor: '#25d366'
                        }} />
                        <Text as="span" variant="bodySm">
                          {feature}
                        </Text>
                      </div>
                    ))}
                  </div>
                </BlockStack>
              </div>

              {/* Action Button */}
              <Button
                variant="primary"
                size="large"
                icon={PlusCircleIcon}
                onClick={onCreateTemplate}
              >
                Create Template
              </Button>

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
