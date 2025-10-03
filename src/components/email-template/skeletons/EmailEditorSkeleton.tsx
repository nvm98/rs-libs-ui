import { Box, BlockStack, InlineStack, SkeletonBodyText, SkeletonDisplayText } from "@shopify/polaris";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";

interface EmailEditorSkeletonProps {
  showPreview?: boolean;
}

export function EmailEditorSkeleton({ showPreview: _showPreview = true }: EmailEditorSkeletonProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar Skeleton */}
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
          <div style={{
            height: '20px',
            backgroundColor: '#f6f6f7',
            borderRadius: '4px',
            width: '80px'
          }} />
        </Box>

        {/* Block List Skeleton */}
        <div style={{ flex: 1, padding: '0 16px', paddingBottom: '60px', overflowY: 'auto' }}>
          <BlockStack gap="200">
            {/* Block Item Skeletons */}
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} style={{
                padding: '12px',
                border: '1px solid #e1e3e5',
                borderRadius: '8px',
                backgroundColor: '#ffffff'
              }}>
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack gap="200" blockAlign="center">
                    {/* Icon skeleton */}
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#f6f6f7',
                      borderRadius: '2px'
                    }} />
                    {/* Block name skeleton */}
                    <div style={{
                      height: '16px',
                      backgroundColor: '#f6f6f7',
                      borderRadius: '4px',
                      width: `${60 + Math.random() * 40}px`
                    }} />
                  </InlineStack>
                  {/* Drag handle skeleton */}
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

        {/* Variable Panel Skeleton - Fixed at bottom */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e1e3e5',
          padding: '16px'
        }}>
          <BlockStack gap="200">
            {/* Panel header */}
            <InlineStack align="space-between" blockAlign="center">
              <div style={{
                height: '16px',
                backgroundColor: '#f6f6f7',
                borderRadius: '4px',
                width: '80px'
              }} />
              <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#f6f6f7',
                borderRadius: '2px'
              }} />
            </InlineStack>

            {/* Variable items skeleton */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}>
              {[1, 2, 3, 4].map((index) => (
                <div key={index} style={{
                  height: '24px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '4px',
                  border: '1px solid #e1e3e5'
                }} />
              ))}
            </div>
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
        {/* Preview Header Skeleton */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e1e3e5',
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            height: '20px',
            backgroundColor: '#f6f6f7',
            borderRadius: '4px',
            width: '120px'
          }} />
        </div>

        {/* Preview Content Skeleton */}
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
            maxWidth: '600px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e1e3e5',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {/* Email Content Blocks Skeleton */}
            <div style={{ padding: '24px' }}>
              <BlockStack gap="400">
                {/* Header block skeleton */}
                <div style={{
                  textAlign: 'center',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #e1e3e5'
                }}>
                  <div style={{
                    height: '32px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '4px',
                    width: '200px',
                    margin: '0 auto'
                  }} />
                </div>

                {/* Text block skeleton */}
                <div>
                  <SkeletonDisplayText size="small" />
                  <div style={{ marginTop: '8px' }}>
                    <SkeletonBodyText lines={3} />
                  </div>
                </div>

                {/* Product block skeleton */}
                <div style={{
                  border: '1px solid #e1e3e5',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <InlineStack gap="300">
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#f6f6f7',
                      borderRadius: '6px'
                    }} />
                    <div style={{ flex: 1 }}>
                      <BlockStack gap="200">
                        <div style={{
                          height: '20px',
                          backgroundColor: '#f6f6f7',
                          borderRadius: '4px',
                          width: '70%'
                        }} />
                        <SkeletonBodyText lines={2} />
                        <div style={{
                          height: '16px',
                          backgroundColor: '#f6f6f7',
                          borderRadius: '4px',
                          width: '40%'
                        }} />
                      </BlockStack>
                    </div>
                  </InlineStack>
                </div>

                {/* Button skeleton */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    height: '44px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '6px',
                    width: '150px'
                  }} />
                </div>

                {/* Footer skeleton */}
                <div style={{
                  borderTop: '1px solid #e1e3e5',
                  paddingTop: '16px',
                  textAlign: 'center'
                }}>
                  <SkeletonBodyText lines={2} />
                </div>
              </BlockStack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
