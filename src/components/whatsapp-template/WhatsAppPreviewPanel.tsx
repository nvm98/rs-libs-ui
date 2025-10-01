import React from 'react';
import {
  BlockStack
} from '@shopify/polaris';
import { WhatsAppTemplateConfig } from './types';
import { HeaderRenderer } from './renderers/HeaderRenderer';
import { BodyRenderer } from './renderers/BodyRenderer';
import { FooterRenderer } from './renderers/FooterRenderer';
import { ButtonsRenderer } from './renderers/ButtonsRenderer';

interface WhatsAppPreviewPanelProps {
  template: WhatsAppTemplateConfig;
}

export const WhatsAppPreviewPanel: React.FC<WhatsAppPreviewPanelProps> = ({
  template
}) => {

  // Main container styles
  const containerStyles: React.CSSProperties = {
    height: '100vh',
    backgroundColor: '#f6f6f7',
    display: 'flex',
    flexDirection: 'column'
  };

  // Header styles
  const headerStyles: React.CSSProperties = {
    padding: '20px 24px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e1e3e5',
    fontSize: '20px',
    fontWeight: '600',
    color: '#202223'
  };

  // Content area styles
  const contentStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px'
  };

  // Message card styles
  const messageCardStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%',
    border: '1px solid #e1e3e5'
  };

  // Email header styles
  const emailHeaderStyles: React.CSSProperties = {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e1e3e5',
    fontSize: '14px',
    color: '#6b7280'
  };

  const emailFieldStyles: React.CSSProperties = {
    marginBottom: '8px'
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>Preview</div>
      <div style={contentStyles}>
        <div style={messageCardStyles}>
          {/* WhatsApp message header info */}
          <div style={emailHeaderStyles}>
            <div style={emailFieldStyles}>
              <strong>From:</strong> My Awesome Store &lt;noreply@mystore.myshopify.com&gt;
            </div>
            <div style={emailFieldStyles}>
              <strong>To:</strong> john@example.com
            </div>
            <div style={emailFieldStyles}>
              <strong>Subject:</strong> Your order update
            </div>
          </div>

          {/* WhatsApp template content */}
          <BlockStack gap="400">
            {/* Header */}
            {template.header && (
              <HeaderRenderer
                block={{
                  format: template.header.type,
                  text: template.header.text,
                  media_url: template.header.media_url
                }}
              />
            )}

            {/* Body */}
            <BodyRenderer
              block={{
                text: template.body.text
              }}
            />

            {/* Footer */}
            {template.footer && (
              <FooterRenderer
                block={{
                  text: template.footer.text
                }}
              />
            )}

            {/* Buttons */}
            {template.buttons && template.buttons.length > 0 && (
              <ButtonsRenderer
                block={{
                  buttons: template.buttons
                }}
              />
            )}
          </BlockStack>
        </div>
      </div>
    </div>
  );
};
