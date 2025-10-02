import { BlockStack, InlineStack } from "@shopify/polaris";

interface WhatsAppEditorSkeletonProps {
  showPreview?: boolean;
}

export function WhatsAppEditorSkeleton({ showPreview: _showPreview = true }: WhatsAppEditorSkeletonProps) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Panel - Editor Sidebar */}
      <div style={{
        width: '319px',
        minWidth: '319px',
        maxWidth: '319px',
        borderRight: '1px solid #e1e3e5',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e1e3e5',
          backgroundColor: '#ffffff'
        }}>
          <InlineStack align="space-between" blockAlign="center">
            <div style={{
              height: '20px',
              backgroundColor: '#f6f6f7',
              borderRadius: '4px',
              width: '140px'
            }} />
            <div style={{
              height: '32px',
              backgroundColor: '#f6f6f7',
              borderRadius: '6px',
              width: '80px'
            }} />
          </InlineStack>
        </div>

        {/* Sidebar Content */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto'
        }}>
          <BlockStack gap="600">
            {/* Template Info Section */}
            <div>
              <div style={{
                height: '18px',
                backgroundColor: '#f6f6f7',
                borderRadius: '4px',
                width: '120px',
                marginBottom: '16px'
              }} />
              <BlockStack gap="400">
                {/* Template Name */}
                <div>
                  <div style={{
                    height: '14px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '3px',
                    width: '100px',
                    marginBottom: '8px'
                  }} />
                  <div style={{
                    height: '36px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '6px',
                    border: '1px solid #e1e3e5'
                  }} />
                </div>

                {/* Language */}
                <div>
                  <div style={{
                    height: '14px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '3px',
                    width: '70px',
                    marginBottom: '8px'
                  }} />
                  <div style={{
                    height: '36px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '6px',
                    border: '1px solid #e1e3e5'
                  }} />
                </div>

                {/* Category */}
                <div>
                  <div style={{
                    height: '14px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '3px',
                    width: '80px',
                    marginBottom: '8px'
                  }} />
                  <div style={{
                    height: '36px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '6px',
                    border: '1px solid #e1e3e5'
                  }} />
                </div>
              </BlockStack>
            </div>

            {/* Template Blocks Section */}
            <div>
              <div style={{
                height: '18px',
                backgroundColor: '#f6f6f7',
                borderRadius: '4px',
                width: '130px',
                marginBottom: '16px'
              }} />

              {/* Add Block Buttons */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  height: '14px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '3px',
                  width: '80px',
                  marginBottom: '12px'
                }} />
                <InlineStack gap="200" wrap={false}>
                  {['Header', 'Body', 'Footer', 'Buttons'].map((_, index) => (
                    <div key={index} style={{
                      height: '32px',
                      backgroundColor: '#f6f6f7',
                      borderRadius: '6px',
                      width: '70px',
                      border: '1px solid #e1e3e5',
                      flex: '0 0 auto'
                    }} />
                  ))}
                </InlineStack>
              </div>

              {/* Block Items */}
              <BlockStack gap="300">
                {[
                  { name: 'Header', width: '60px' },
                  { name: 'Body', width: '45px' },
                  { name: 'Footer', width: '55px' }
                ].map((block, index) => (
                  <div key={index} style={{
                    padding: '16px',
                    border: '1px solid #e1e3e5',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer'
                  }}>
                    <InlineStack align="space-between" blockAlign="center">
                      <InlineStack gap="300" blockAlign="center">
                        {/* Block Icon */}
                        <div style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: '#f6f6f7',
                          borderRadius: '4px'
                        }} />
                        {/* Block Name */}
                        <div style={{
                          height: '16px',
                          backgroundColor: '#f6f6f7',
                          borderRadius: '4px',
                          width: block.width
                        }} />
                      </InlineStack>
                      {/* Settings Icon */}
                      <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: '#f6f6f7',
                        borderRadius: '2px'
                      }} />
                    </InlineStack>
                  </div>
                ))}
              </BlockStack>
            </div>
          </BlockStack>
        </div>
      </div>

      {/* Right Panel - WhatsApp Preview */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Preview Header Skeleton */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e1e3e5',
          backgroundColor: '#ffffff'
        }}>
          <InlineStack align="space-between" blockAlign="center">
            <div style={{
              height: '18px',
              backgroundColor: '#f6f6f7',
              borderRadius: '4px',
              width: '130px'
            }} />
            <div style={{
              height: '32px',
              backgroundColor: '#f6f6f7',
              borderRadius: '6px',
              width: '60px'
            }} />
          </InlineStack>
        </div>

        {/* WhatsApp Preview Content Skeleton */}
        <div style={{
          flex: 1,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          {/* WhatsApp Message Bubble */}
          <div style={{
            padding: '0',
            borderRadius: '7.5px',
            borderBottomRightRadius: '2px',
            width: 'auto',
            minWidth: '200px',
            boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
            position: 'relative',
            marginLeft: '60px'
          }}>
            {/* Message Content */}
            <div style={{
              color: '#ffffff',
              fontSize: '14.2px',
              lineHeight: '19px',
              padding: '6px 7px 8px 9px'
            }}>
              <BlockStack gap="200">
                {/* Header skeleton */}
                <div style={{
                  height: '20px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '4px',
                  width: '75%'
                }} />

                {/* Body text skeleton */}
                <div>
                  <div style={{
                    height: '14px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '3px',
                    width: '90%',
                    marginBottom: '6px'
                  }} />
                  <div style={{
                    height: '14px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '3px',
                    width: '70%'
                  }} />
                </div>

                {/* Footer skeleton */}
                <div style={{
                  height: '12px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '3px',
                  width: '50%'
                }} />

                {/* Time and status */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '3px',
                  paddingRight: '0px',
                  marginTop: '4px'
                }}>
                  <div style={{
                    height: '11px',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    borderRadius: '2px',
                    width: '45px'
                  }} />
                </div>
              </BlockStack>
            </div>

            {/* Buttons outside the main message */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              padding: '8px'
            }}>
              <BlockStack gap="200">
                {[1, 2].map((index) => (
                  <div key={index} style={{
                    height: '32px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }} />
                ))}
              </BlockStack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
