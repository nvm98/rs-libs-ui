import { SkeletonBodyText, SkeletonDisplayText, BlockStack, Box, InlineStack } from '@shopify/polaris';
import { useMediaQuery } from '../shared/hooks/useMediaQuery';

interface SMSEditorSkeletonProps {}

export function SMSEditorSkeleton({}: SMSEditorSkeletonProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
    position: isMobile ? 'relative' : undefined,
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar Skeleton (hidden on mobile) */}
      {!isMobile && (
        <div style={{
          width: '319px',
          borderRight: '1px solid #e1e3e5',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
        }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Box width="100%">
              <Box padding={'200'} width="100%">
                <InlineStack align="space-between" blockAlign="center" gap={"200"}>
                  <SkeletonDisplayText size="small" />
                  <div style={{ minWidth: '150px' }}>
                    <SkeletonBodyText lines={1} />
                  </div>
                </InlineStack>
              </Box>

              {/* SMS Body Content Editor Skeleton */}
              <Box padding="200">
                <BlockStack gap="200">
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText lines={4} />
                </BlockStack>
              </Box>
            </Box>
          </div>
        </div>
      )}

      {/* Preview Panel Skeleton */}
      <div style={{ flex: 1 }}>
        {/* Header */}
        <div style={{
          borderBottom: '1px solid #e1e3e5',
          backgroundColor: '#ffffff'
        }}>
          <Box padding={'300'}>
            <InlineStack align="space-between" blockAlign="center">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={1} />
            </InlineStack>
          </Box>
        </div>

        {/* Phone preview area */}
        <div style={{
          height: 'calc(100vh - 65px)',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#e5e5ea',
            padding: '12px 16px',
            borderRadius: '18px',
            borderBottomLeftRadius: '4px',
            maxWidth: '320px',
            width: 'auto',
            minWidth: '200px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}>
            <BlockStack gap="100">
              <SkeletonBodyText lines={1} />
              <SkeletonBodyText lines={2} />
              <SkeletonBodyText lines={1} />
            </BlockStack>
          </div>
        </div>
      </div>

      {/* Floating Edit Button Skeleton (mobile only) */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 40,
        }}>
          <SkeletonBodyText lines={1} />
        </div>
      )}
    </div>
  );
}
