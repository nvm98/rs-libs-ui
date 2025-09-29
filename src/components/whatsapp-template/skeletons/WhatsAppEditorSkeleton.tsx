import { Box, BlockStack, InlineStack, SkeletonBodyText, SkeletonDisplayText } from "@shopify/polaris";

interface WhatsAppEditorSkeletonProps {
  showPreview?: boolean;
}

export function WhatsAppEditorSkeleton({ showPreview: _showPreview = true }: WhatsAppEditorSkeletonProps) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Panel - Template Settings */}
      <div style={{
        width: '50%',
        padding: '20px',
        borderRight: '1px solid #e1e3e5',
        backgroundColor: '#ffffff',
        overflowY: 'auto'
      }}>
        {/* Template Info Skeleton */}
        <Box padding={'400'}>
          <BlockStack gap="400">
            <div>
              <div style={{
                height: '16px',
                backgroundColor: '#f6f6f7',
                borderRadius: '4px',
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

            <div>
              <div style={{
                height: '16px',
                backgroundColor: '#f6f6f7',
                borderRadius: '4px',
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

            <div>
              <div style={{
                height: '16px',
                backgroundColor: '#f6f6f7',
                borderRadius: '4px',
                width: '90px',
                marginBottom: '8px'
              }} />
              <div style={{
                height: '36px',
                backgroundColor: '#f6f6f7',
                borderRadius: '6px',
                border: '1px solid #e1e3e5'
              }} />
            </div>

            <div>
              <div style={{
                height: '16px',
                backgroundColor: '#f6f6f7',
                borderRadius: '4px',
                width: '90px',
                marginBottom: '8px'
              }} />
              <div style={{
                height: '80px',
                backgroundColor: '#f6f6f7',
                borderRadius: '6px',
                border: '1px solid #e1e3e5'
              }} />
            </div>
          </BlockStack>
        </Box>

        {/* Template Blocks Skeleton */}
        <Box padding={'400'}>
          <BlockStack gap="400">
            <div style={{
              height: '20px',
              backgroundColor: '#f6f6f7',
              borderRadius: '4px',
              width: '120px'
            }} />

            {/* Add Blocks Buttons Skeleton */}
            <div>
              <div style={{
                height: '16px',
                backgroundColor: '#f6f6f7',
                borderRadius: '4px',
                width: '80px',
                marginBottom: '12px'
              }} />
              <InlineStack gap="200">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} style={{
                    height: '32px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '6px',
                    width: '80px',
                    border: '1px solid #e1e3e5'
                  }} />
                ))}
              </InlineStack>
            </div>

            {/* Block List Skeleton */}
            <BlockStack gap="300">
              {[1, 2, 3].map((index) => (
                <div key={index} style={{
                  padding: '16px',
                  border: '1px solid #e1e3e5',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff'
                }}>
                  <InlineStack align="space-between" blockAlign="center">
                    <InlineStack gap="200" blockAlign="center">
                      <div style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#f6f6f7',
                        borderRadius: '4px'
                      }} />
                      <div style={{
                        height: '16px',
                        backgroundColor: '#f6f6f7',
                        borderRadius: '4px',
                        width: `${80 + Math.random() * 60}px`
                      }} />
                    </InlineStack>
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
          </BlockStack>
        </Box>
      </div>

      {/* Right Panel - WhatsApp Preview */}
      <div style={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f6f6f7'
      }}>
        {/* Preview Header Skeleton */}
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
              width: '150px'
            }} />
            <InlineStack gap="200">
              <div style={{
                height: '32px',
                backgroundColor: '#f6f6f7',
                borderRadius: '6px',
                width: '80px'
              }} />
              <div style={{
                height: '32px',
                backgroundColor: '#f6f6f7',
                borderRadius: '6px',
                width: '80px'
              }} />
            </InlineStack>
          </InlineStack>
        </div>

        {/* WhatsApp Preview Content Skeleton */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e1e3e5',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {/* WhatsApp Message Skeleton */}
            <div style={{ padding: '16px' }}>
              <BlockStack gap="300">
                {/* Header skeleton */}
                <div style={{
                  height: '24px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '4px',
                  width: '80%'
                }} />

                {/* Body text skeleton */}
                <div>
                  <SkeletonBodyText lines={2} />
                </div>

                {/* Media skeleton */}
                <div style={{
                  height: '120px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '8px'
                }} />

                {/* Buttons skeleton */}
                <BlockStack gap="200">
                  {[1, 2].map((index) => (
                    <div key={index} style={{
                      height: '36px',
                      backgroundColor: '#f6f6f7',
                      borderRadius: '6px',
                      border: '1px solid #e1e3e5'
                    }} />
                  ))}
                </BlockStack>

                {/* Footer skeleton */}
                <div style={{
                  height: '16px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '4px',
                  width: '60%'
                }} />
              </BlockStack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
