import React from 'react';
import {
  Card,
  Text,
  ButtonGroup,
  Button,
  BlockStack,
  InlineStack
} from '@shopify/polaris';
import { MobileIcon, DesktopIcon } from '@shopify/polaris-icons';
import { WhatsAppTemplate, WhatsAppBlock, WhatsAppBlockType } from './types';
import {
  HeaderRenderer,
  BodyRenderer,
  FooterRenderer,
  ButtonsRenderer,
  MediaRenderer,
  VariableRenderer
} from './renderers';

interface WhatsAppPreviewPanelProps {
  template: WhatsAppTemplate;
  blocks: WhatsAppBlock[];
  previewMode: 'desktop' | 'mobile';
  onPreviewModeChange: (mode: 'desktop' | 'mobile') => void;
}

export const WhatsAppPreviewPanel: React.FC<WhatsAppPreviewPanelProps> = ({
  template: _template,
  blocks,
  previewMode,
  onPreviewModeChange
}) => {
  const renderBlock = (block: WhatsAppBlock) => {
    switch (block.type) {
      case WhatsAppBlockType.HEADER:
        return <HeaderRenderer block={block as any} />;
      case WhatsAppBlockType.BODY:
        return <BodyRenderer block={block as any} />;
      case WhatsAppBlockType.FOOTER:
        return <FooterRenderer block={block as any} />;
      case WhatsAppBlockType.BUTTONS:
        return <ButtonsRenderer block={block as any} />;
      case WhatsAppBlockType.MEDIA:
        return <MediaRenderer block={block as any} />;
      case WhatsAppBlockType.VARIABLE:
        return <VariableRenderer block={block as any} />;
      default:
        return null;
    }
  };

  const previewStyles: React.CSSProperties = {
    backgroundColor: '#E5DDD5',
    padding: '20px',
    borderRadius: '8px',
    width: previewMode === 'mobile' ? '320px' : '100%',
    margin: '0 auto'
  };

  const messageBubbleStyles: React.CSSProperties = {
    backgroundColor: '#DCF8C6',
    padding: '10px',
    borderRadius: '8px',
    maxWidth: '80%',
    alignSelf: 'flex-end',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
  };

  return (
    <Card padding="400">
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
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

        <div style={previewStyles}>
          <div style={messageBubbleStyles}>
            <BlockStack gap="200">
              {blocks.sort((a, b) => a.order - b.order).map(block => (
                <div key={block.id}>{renderBlock(block)}</div>
              ))}
            </BlockStack>
          </div>
        </div>
      </BlockStack>
    </Card>
  );
};
