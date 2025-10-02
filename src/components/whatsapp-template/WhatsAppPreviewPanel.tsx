import React from 'react';
import {
  BlockStack,
  Box,
  Text,
  Button,
  InlineStack
} from '@shopify/polaris';
import { WhatsAppTemplate, WhatsAppBlockType } from './types';
import { HeaderRenderer } from './renderers/HeaderRenderer';
import { BodyRenderer } from './renderers/BodyRenderer';
import { FooterRenderer } from './renderers/FooterRenderer';
import { ButtonsRenderer } from './renderers/ButtonsRenderer';

interface WhatsAppPreviewPanelProps {
  template: WhatsAppTemplate;
  onSave?: () => void;
}

export const WhatsAppPreviewPanel: React.FC<WhatsAppPreviewPanelProps> = ({
  template,
  onSave
}) => {
  const getBlockByType = (type: WhatsAppBlockType) => {
    return template.blocks.find(block => block.type === type);
  };

  const headerBlock = getBlockByType(WhatsAppBlockType.HEADER);
  const bodyBlock = getBlockByType(WhatsAppBlockType.BODY);
  const footerBlock = getBlockByType(WhatsAppBlockType.FOOTER);
  const buttonsBlock = getBlockByType(WhatsAppBlockType.BUTTONS);

  // Main container styles - Simple background
  const containerStyles: React.CSSProperties = {
    height: 'calc(100vh - 65px)',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  // WhatsApp message bubble - Outgoing message style
  const messageCardStyles: React.CSSProperties = {
    backgroundColor: 'rgb(36 38 38)',
    padding: '0',
    borderRadius: '7.5px',
    borderBottomRightRadius: '2px',
    maxWidth: '320px',
    width: 'auto',
    minWidth: '200px',
    boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
    position: 'relative'
  };

  // Message content styles
  const messageContentStyles: React.CSSProperties = {
    color: '#ffffff',
    fontSize: '14.2px',
    lineHeight: '19px'
  };

  // Time and status container
  const timeStatusStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '3px',
    paddingRight: '7px',
  };

  // Time stamp styles
  const timeStampStyles: React.CSSProperties = {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '400'
  };

  // Message status (double check)
  const statusStyles: React.CSSProperties = {
    fontSize: '16px',
    color: '#53bdeb',
    lineHeight: '1'
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
            <Text as="h3" variant="headingSm" tone="subdued">WhatsApp Preview</Text>
            {onSave && (
              <Button variant="primary" onClick={onSave}>
                Save
              </Button>
            )}
          </InlineStack>
        </Box>
      </div>
      <div style={containerStyles}>
        <div style={messageCardStyles}>
          {/* WhatsApp template content */}
          <div style={messageContentStyles}>
            <BlockStack gap="200">
              {headerBlock && headerBlock.visible !== false && <HeaderRenderer block={headerBlock as any} />}
              {bodyBlock && bodyBlock.visible !== false && <BodyRenderer block={bodyBlock as any} />}
              {footerBlock && footerBlock.visible !== false && <FooterRenderer block={footerBlock as any} />}
              {/* Time and status */}
              <div style={timeStatusStyles}>
                <span style={timeStampStyles}>10:20 PM</span>
              </div>
              {buttonsBlock && buttonsBlock.visible !== false && <ButtonsRenderer block={buttonsBlock as any} />}
            </BlockStack>
          </div>
        </div>
      </div>
    </div>
  );
};
