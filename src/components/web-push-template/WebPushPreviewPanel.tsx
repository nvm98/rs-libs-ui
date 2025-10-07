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
import { WebPushBlockType } from './types';
import { TitleRenderer } from './renderers/TitleRenderer';
import { BodyRenderer } from './renderers/BodyRenderer';
import { Template } from '../shared/types';

interface WebPushPreviewPanelProps {
  template: Template;
  replaceVariables: (text: string) => string;
  onSave?: () => void;
}

type PreviewMode = 'desktop' | 'mobile';

export const WebPushPreviewPanel: React.FC<WebPushPreviewPanelProps> = ({
  template,
  replaceVariables,
  onSave
}) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  const getBlockByType = (type: WebPushBlockType) => {
    return template.blocks.find(block => block.type === type);
  };

  const titleBlock = getBlockByType('title');
  const bodyBlock = getBlockByType('body');

  // Container styles - Clean background
  const containerStyles: React.CSSProperties = {
    height: 'calc(100vh - 65px)',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px'
  };

  // Notification card styles - Realistic notification appearance
  const notificationCardStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '8px',
    maxWidth: previewMode === 'desktop' ? '400px' : '350px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '1px solid #e1e5e9',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  };

  // Notification content styles - Adjust only text size for desktop/mobile
  const notificationContentStyles: React.CSSProperties = {
    color: '#333333',
    fontSize: previewMode === 'desktop' ? '14px' : '13px',
    lineHeight: '1.4'
  };

  // Icon styles - Slightly different sizes for desktop/mobile
  const iconStyles: React.CSSProperties = {
    width: previewMode === 'desktop' ? '36px' : '32px',
    height: previewMode === 'desktop' ? '36px' : '32px',
    borderRadius: '6px',
    backgroundColor: '#f0f0f0',
    marginRight: '12px',
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
        {previewMode === 'mobile' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '350px' }}>
            {/* Initial State - Collapsed */}
            <div>
              <Text as="h4" variant="headingXs" tone="subdued" alignment="center">Initial State</Text>
              <div style={{
                ...notificationCardStyles,
                marginTop: '8px'
              }}>
                <div style={notificationContentStyles}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    {/* App Icon */}
                    {/* <div style={iconStyles}>
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
                    </div> */}

                    {/* Notification Content */}
                    <div style={{ flex: 1 }}>
                      <BlockStack gap="200">
                        {titleBlock && titleBlock.visible !== false && <TitleRenderer block={titleBlock as any} replaceVariables={replaceVariables} />}
                        {bodyBlock && bodyBlock.visible !== false && <BodyRenderer block={bodyBlock as any} replaceVariables={replaceVariables} />}
                      </BlockStack>
                    </div>

                    {/* Small image on the right for collapsed state */}
                    {bodyBlock && bodyBlock.image && (
                      <div style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginLeft: '12px',
                        flexShrink: 0
                      }}>
                        <img
                          src={bodyBlock.image}
                          alt="Notification Image"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded State */}
            <div>
              <Text as="h4" variant="headingXs" tone="subdued" alignment="center">Expanded State</Text>
              <div style={{
                ...notificationCardStyles,
                marginTop: '8px'
              }}>
                <div style={notificationContentStyles}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    {/* App Icon */}
                    {/* <div style={iconStyles}>
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
                    </div> */}

                    {/* Notification Content */}
                    <div style={{ flex: 1 }}>
                      <BlockStack gap="200">
                        {titleBlock && titleBlock.visible !== false && <TitleRenderer block={titleBlock as any} replaceVariables={replaceVariables} />}
                        {bodyBlock && bodyBlock.visible !== false && <BodyRenderer block={bodyBlock as any} replaceVariables={replaceVariables} />}
                      </BlockStack>

                      {/* Large image below for expanded state */}
                      {bodyBlock && bodyBlock.image && (
                        <div style={{
                          marginTop: '12px',
                          width: '100%',
                          height: '120px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <img
                            src={bodyBlock.image}
                            alt="Notification Image"
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'cover',
                              borderRadius: '6px'
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<span style="color: #999; font-size: 12px;">Image not available</span>';
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
        ) : (
          /* Desktop view - single notification */
          <div style={notificationCardStyles}>
            <div style={notificationContentStyles}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                {/* App Icon */}
                {/* <div style={iconStyles}>
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
                </div> */}

                {/* Notification Content */}
                <div style={{ flex: 1 }}>
                  <BlockStack gap="200">
                    {titleBlock && titleBlock.visible !== false && <TitleRenderer block={titleBlock as any} replaceVariables={replaceVariables} />}
                    {bodyBlock && bodyBlock.visible !== false && <BodyRenderer block={bodyBlock as any} replaceVariables={replaceVariables} />}
                  </BlockStack>

                  {/* Body block image if present */}
                  {bodyBlock && bodyBlock.image && (
                    <div style={{
                      marginTop: '12px',
                      width: '100%',
                      height: '140px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img
                        src={bodyBlock.image}
                        alt="Notification Image"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<span style="color: #999; font-size: 12px;">Image not available</span>';
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
