import React from 'react';
import {
  Card,
  Text,
  Button,
  ButtonGroup,
  Badge,
  Icon,
  BlockStack,
  InlineStack
} from '@shopify/polaris';
import { DeleteIcon, DragHandleIcon } from '@shopify/polaris-icons';
import { WhatsAppBlock, WhatsAppBlockType } from './types';
import {
  HeaderRenderer,
  BodyRenderer,
  FooterRenderer,
  ButtonsRenderer,
  MediaRenderer,
  VariableRenderer
} from './renderers';

interface WhatsAppBlockRendererProps {
  block: WhatsAppBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<WhatsAppBlock>) => void;
  onDelete: () => void;
}

export const WhatsAppBlockRenderer: React.FC<WhatsAppBlockRendererProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate: _onUpdate,
  onDelete
}) => {
  const getBlockTypeLabel = (type: WhatsAppBlockType) => {
    switch (type) {
      case WhatsAppBlockType.HEADER:
        return 'Header';
      case WhatsAppBlockType.BODY:
        return 'Body';
      case WhatsAppBlockType.FOOTER:
        return 'Footer';
      case WhatsAppBlockType.BUTTONS:
        return 'Buttons';
      case WhatsAppBlockType.MEDIA:
        return 'Media';
      case WhatsAppBlockType.VARIABLE:
        return 'Variable';
      default:
        return 'Unknown';
    }
  };

  const getBlockTypeColor = (type: WhatsAppBlockType) => {
    switch (type) {
      case WhatsAppBlockType.HEADER:
        return 'info';
      case WhatsAppBlockType.BODY:
        return 'success';
      case WhatsAppBlockType.FOOTER:
        return 'subdued';
      case WhatsAppBlockType.BUTTONS:
        return 'attention';
      case WhatsAppBlockType.MEDIA:
        return 'warning';
      case WhatsAppBlockType.VARIABLE:
        return 'new';
      default:
        return 'subdued';
    }
  };

  const renderBlockContent = () => {
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
        return <Text as="p" variant="bodyMd">Unknown block type</Text>;
    }
  };

  return (
    <Card padding="400">
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <InlineStack align="start" blockAlign="center" gap="200">
            <Icon source={DragHandleIcon} />
            <Badge tone={getBlockTypeColor(block.type) as any}>
              {getBlockTypeLabel(block.type)}
            </Badge>
          </InlineStack>

          <ButtonGroup>
            <Button
              size="slim"
              pressed={isSelected}
              onClick={onSelect}
            >
              {isSelected ? 'Selected' : 'Select'}
            </Button>
            <Button
              size="slim"
              icon={DeleteIcon}
              onClick={onDelete}
              variant="primary"
              tone="critical"
            />
          </ButtonGroup>
        </InlineStack>

        {renderBlockContent()}
      </BlockStack>
    </Card>
  );
};
