import React from 'react';
import {
  Card,
  InlineStack,
  BlockStack,
  Text,
  ButtonGroup,
  Button
} from '@shopify/polaris';
import { MobileIcon, DesktopIcon } from '@shopify/polaris-icons';
import { WebPushTemplate, WebPushBlock } from './types';

interface WebPushPreviewPanelProps {
  template: WebPushTemplate;
  blocks: WebPushBlock[];
  previewMode: 'desktop' | 'mobile';
  onPreviewModeChange: (mode: 'desktop' | 'mobile') => void;
}

export const WebPushPreviewPanel: React.FC<WebPushPreviewPanelProps> = ({
  template,
  blocks: _blocks,
  previewMode,
  onPreviewModeChange
}) => {
  const previewStyles: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    padding: '16px',
    borderRadius: '8px',
    width: previewMode === 'mobile' ? '320px' : '400px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const notificationStyles: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    border: '1px solid #e1e1e1'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
    lineHeight: '1.2'
  };

  const bodyStyles: React.CSSProperties = {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.3',
    marginBottom: '8px'
  };

  const iconStyles: React.CSSProperties = {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    backgroundColor: '#ddd',
    marginRight: '8px',
    flexShrink: 0
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '120px',
    backgroundColor: '#ddd',
    borderRadius: '4px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    fontSize: '12px'
  };

  const actionButtonStyles: React.CSSProperties = {
    padding: '6px 12px',
    margin: '2px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer'
  };

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <InlineStack align="space-between">
          <Text as="h2" variant="headingMd">Preview</Text>
          <ButtonGroup>
            <Button
              icon={MobileIcon}
              pressed={previewMode === 'mobile'}
              onClick={() => onPreviewModeChange('mobile')}
            >
              Mobile
            </Button>
            <Button
              icon={DesktopIcon}
              pressed={previewMode === 'desktop'}
              onClick={() => onPreviewModeChange('desktop')}
            >
              Desktop
            </Button>
          </ButtonGroup>
        </InlineStack>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={previewStyles}>
          <div style={notificationStyles}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              {template.icon && (
                <div style={iconStyles}>
                  <img 
                    src={template.icon} 
                    alt="Icon" 
                    style={{ width: '100%', height: '100%', borderRadius: '4px' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div style={{ flex: 1 }}>
                <div style={titleStyles}>
                  {template.title || 'Notification Title'}
                </div>
                
                <div style={bodyStyles}>
                  {template.body || 'Notification body text will appear here...'}
                </div>

                {template.image && (
                  <div style={imageStyles}>
                    <img 
                      src={template.image} 
                      alt="Notification" 
                      style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '4px' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.textContent = 'Image Preview';
                        }
                      }}
                    />
                  </div>
                )}

                {template.actions && template.actions.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    {template.actions.map((action, index) => (
                      <button key={index} style={actionButtonStyles}>
                        {action.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Settings indicators */}
            <div style={{ marginTop: '8px', fontSize: '11px', color: '#999' }}>
              {template.requireInteraction && <span>• Requires interaction </span>}
              {template.silent && <span>• Silent </span>}
              {template.renotify && <span>• Renotify </span>}
              {template.tag && <span>• Tag: {template.tag}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs">Template Info</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Title: {template.title?.length || 0}/50 characters
          </Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Body: {template.body?.length || 0}/160 characters
          </Text>
          {template.actions && (
            <Text as="p" variant="bodyMd" tone="subdued">
              Actions: {template.actions.length}/2
            </Text>
          )}
        </BlockStack>
      </div>
    </Card>
  );
};
