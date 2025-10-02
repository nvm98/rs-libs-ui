import React from 'react';
import {
  BlockStack,
  InlineStack,
  Text,
  Box,
  Button
} from '@shopify/polaris';
import { SMSTemplate } from './types';

interface SMSPreviewPanelProps {
  template: SMSTemplate;
  onSave?: () => void;
}

export const SMSPreviewPanel: React.FC<SMSPreviewPanelProps> = ({
  template,
  onSave
}) => {
  const bodyBlock = template.blocks.find(block => block.type === 'body');
  const previewMessage = bodyBlock?.content || '';

  // Main container styles - Similar to WhatsApp
  const containerStyles: React.CSSProperties = {
    height: 'calc(100vh - 65px)',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  // SMS message bubble - Incoming message style (like iPhone)
  const messageCardStyles: React.CSSProperties = {
    backgroundColor: '#e5e5ea',
    color: '#000000',
    padding: '12px 16px',
    borderRadius: '18px',
    borderBottomLeftRadius: '4px',
    maxWidth: '320px',
    width: 'auto',
    minWidth: '200px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    position: 'relative',
    fontSize: '16px',
    lineHeight: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  // Sender info styles
  const senderInfoStyles: React.CSSProperties = {
    fontSize: '13px',
    color: '#8e8e93',
    marginBottom: '4px',
    fontWeight: '600'
  };

  // Time stamp styles
  const timeStampStyles: React.CSSProperties = {
    fontSize: '12px',
    color: '#8e8e93',
    marginTop: '4px',
    textAlign: 'left' as const
  };

  return (
    <div style={{ flex: 1 }}>
      {/* Header similar to WhatsApp */}
      <div style={{
        borderBottom: '1px solid #e1e3e5',
        backgroundColor: '#ffffff'
      }}>
        <Box padding={'300'}>
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h3" variant="headingSm" tone="subdued">SMS Preview</Text>
            {onSave && (
              <Button variant="primary" onClick={onSave}>
                Save
              </Button>
            )}
          </InlineStack>
        </Box>
      </div>

      {/* Phone preview area */}
      <div style={containerStyles}>
        <BlockStack gap="400" align="center">
          {/* SMS Message Bubble */}
          <div style={messageCardStyles}>
            <div style={senderInfoStyles}>
              {template.sender_id || 'SENDER'}
            </div>
            <div>
              {previewMessage || 'Your SMS message will appear here...'}
            </div>
            <div style={timeStampStyles}>
              now
            </div>
          </div>


        </BlockStack>
      </div>
    </div>
  );
};
