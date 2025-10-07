import { BlockStack, InlineStack } from "@shopify/polaris";

interface WebPushEditorSkeletonProps {
  showPreview?: boolean;
}

export function WebPushEditorSkeleton({ showPreview: _showPreview = true }: WebPushEditorSkeletonProps) {
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

              {/* Block Items */}
              <BlockStack gap="300">
                {[
                  { name: 'Title', width: '45px' },
                  { name: 'Body', width: '40px' }
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

      {/* Right Panel - Web Push Preview */}
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
              width: '100px'
            }} />
          </InlineStack>
        </div>

        {/* Web Push Preview Content Skeleton */}
        <div style={{
          flex: 1,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          {/* Web Push Notification */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            width: '400px',
            padding: '16px',
            border: '1px solid #e1e3e5'
          }}>
            <BlockStack gap="300">
              {/* Title skeleton */}
              <div style={{
                height: '20px',
                backgroundColor: '#f6f6f7',
                borderRadius: '4px',
                width: '80%'
              }} />

              {/* Body text skeleton */}
              <div>
                <div style={{
                  height: '16px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '3px',
                  width: '95%',
                  marginBottom: '8px'
                }} />
                <div style={{
                  height: '16px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '3px',
                  width: '75%'
                }} />
              </div>

              {/* Icon and timestamp */}
              <InlineStack align="space-between" blockAlign="center">
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '4px'
                }} />
                <div style={{
                  height: '12px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '2px',
                  width: '60px'
                }} />
              </InlineStack>
            </BlockStack>
          </div>
        </div>
      </div>
    </div>
  );
}
