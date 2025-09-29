import React from 'react';
import {
  Card,
  Text,
  BlockStack
} from '@shopify/polaris';
import { WhatsAppBlock, WhatsAppBlockType } from './types';
import {
  HeaderBlock,
  BodyBlock,
  FooterBlock,
  ButtonsBlock,
  MediaBlock,
  VariableBlock
} from './blocks';

interface WhatsAppBlockSettingsProps {
  block: WhatsAppBlock;
  onUpdate: (updates: Partial<WhatsAppBlock>) => void;
}

export const WhatsAppBlockSettings: React.FC<WhatsAppBlockSettingsProps> = ({ block, onUpdate }) => {
  const renderSettings = () => {
    switch (block.type) {
      case WhatsAppBlockType.HEADER:
        return <HeaderBlock block={block as any} onUpdate={onUpdate} />;
      case WhatsAppBlockType.BODY:
        return <BodyBlock block={block as any} onUpdate={onUpdate} />;
      case WhatsAppBlockType.FOOTER:
        return <FooterBlock block={block as any} onUpdate={onUpdate} />;
      case WhatsAppBlockType.BUTTONS:
        return <ButtonsBlock block={block as any} onUpdate={onUpdate} />;
      case WhatsAppBlockType.MEDIA:
        return <MediaBlock block={block as any} onUpdate={onUpdate} />;
      case WhatsAppBlockType.VARIABLE:
        return <VariableBlock block={block as any} onUpdate={onUpdate} />;
      default:
        return <Text as="p" variant="bodyMd" tone="subdued">No settings for this block type.</Text>;
    }
  };

  return (
    <Card padding="400">
      <BlockStack gap="400">
        {renderSettings()}
      </BlockStack>
    </Card>
  );
};
