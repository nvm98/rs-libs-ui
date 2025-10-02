import React, { useState } from 'react';
import {
  BlockStack,
  Box,
  Text,
  Button,
  ButtonGroup,
  InlineStack
} from '@shopify/polaris';
import { MobileIcon, DesktopIcon } from '@shopify/polaris-icons';
import { WebPushTemplate, WebPushBlockType } from './types';
import { TitleRenderer } from './renderers/TitleRenderer';
import { BodyRenderer } from './renderers/BodyRenderer';

interface WebPushPreviewPanelProps {
  template: WebPushTemplate;
  onSave?: () => void;
}

type PreviewMode = 'desktop' | 'mobile';

export const WebPushPreviewPanel: React.FC<WebPushPreviewPanelProps> = ({
  template,
  onSave
}) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  const getBlockByType = (type: WebPushBlockType) => {
    return template.blocks.find(block => block.type === type);
  };

  const titleBlock = getBlockByType('title');
  const bodyBlock = getBlockByType('body');

  // Container styles - Different backgrounds for desktop and mobile
  const containerStyles: React.CSSProperties = {
    height: 'calc(100vh - 65px)',
    backgroundColor: previewMode === 'desktop' ? '#f8f9fa' : '#000000',
    display: 'flex',
    alignItems: previewMode === 'desktop' ? 'center' : 'flex-start',
    justifyContent: previewMode === 'desktop' ? 'center' : 'flex-start',
    padding: previewMode === 'desktop' ? '40px' : '0px',
    position: 'relative'
  };

  // Notification card styles - Different for desktop and mobile
  const notificationCardStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: previewMode === 'desktop' ? '20px' : '16px',
    borderRadius: previewMode === 'desktop' ? '12px' : '8px',
    maxWidth: previewMode === 'desktop' ? '400px' : '320px',
    width: '100%',
    boxShadow: previewMode === 'desktop'
      ? '0 4px 16px rgba(0, 0, 0, 0.1)'
      : '0 2px 8px rgba(0, 0, 0, 0.15)',
    border: previewMode === 'desktop' ? '1px solid #e5e7eb' : 'none',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    position: previewMode === 'mobile' ? 'relative' : 'static',
    ...(previewMode === 'mobile' && {
      marginTop: '20px',
      marginLeft: '16px',
      marginRight: '16px'
    })
  };

  // Notification content styles - Different for desktop and mobile
  const notificationContentStyles: React.CSSProperties = {
    color: previewMode === 'desktop' ? '#333333' : '#ffffff',
    fontSize: previewMode === 'desktop' ? '16px' : '14px',
    lineHeight: '1.5'
  };

  // Icon styles - Different sizes for desktop and mobile
  const iconStyles: React.CSSProperties = {
    width: previewMode === 'desktop' ? '40px' : '32px',
    height: previewMode === 'desktop' ? '40px' : '32px',
    borderRadius: previewMode === 'desktop' ? '8px' : '6px',
    backgroundColor: '#f0f0f0',
    marginRight: previewMode === 'desktop' ? '16px' : '12px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={{
      flex: 1
    }}>
      <div style={{
        borderBottom: '1px solid #e1e3e5',
        backgroundColor: '#ffffff'
      }}>
        <Box padding={'300'}>
          <InlineStack align="space-between" blockAlign="center">
            <InlineStack gap="300" blockAlign="center">
              <Text as="h3" variant="headingSm" tone="subdued">Preview</Text>
            </InlineStack>
            <InlineStack gap={'200'}>
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
              {onSave && (
                <Button variant="primary" onClick={onSave}>
                  Save
                </Button>
              )}
            </InlineStack>
          </InlineStack>
        </Box>
      </div>
      <div style={containerStyles}>
        <div style={notificationCardStyles}>
          {/* Simple notification content */}
          <div style={notificationContentStyles}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              {/* App Icon */}
              <div style={iconStyles}>
                {template.icon ? (
                  <img
                    src={template.icon}
                    alt="App Icon"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '🔔';
                        parent.style.fontSize = '20px';
                      }
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '20px' }}>🔔</span>
                )}
              </div>

              {/* Notification Content */}
              <div style={{ flex: 1 }}>
                <BlockStack gap="200">
                  {titleBlock && titleBlock.visible !== false && <TitleRenderer block={titleBlock as any} />}
                  {bodyBlock && bodyBlock.visible !== false && <BodyRenderer block={bodyBlock as any} />}
                </BlockStack>

                {/* Large image if present */}
                {template.image && (
                  <div style={{
                    marginTop: '16px',
                    width: '100%',
                    height: '160px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={template.image}
                      alt="Notification"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<span style="color: #999; font-size: 14px;">Image Preview</span>';
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
