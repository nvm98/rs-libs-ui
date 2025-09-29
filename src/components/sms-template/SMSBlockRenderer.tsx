import React from 'react';
import {
  Card,
  InlineStack,
  BlockStack,
  Text,
  Button,
  ButtonGroup,
  Badge,
  Icon
} from '@shopify/polaris';
import { DeleteIcon, DragHandleIcon } from '@shopify/polaris-icons';
import { SMSBlock, SMSBlockType } from './types';

interface SMSBlockRendererProps {
  block: SMSBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<SMSBlock>) => void;
  onDelete: () => void;
}

export const SMSBlockRenderer: React.FC<SMSBlockRendererProps> = ({
  block,
  isSelected,
  onSelect,
  onDelete
}) => {
  const getBlockTypeLabel = (type: SMSBlockType) => {
    switch (type) {
      case SMSBlockType.TEXT:
        return 'Text';
      case SMSBlockType.VARIABLE:
        return 'Variable';
      case SMSBlockType.LINK:
        return 'Link';
      case SMSBlockType.PHONE:
        return 'Phone';
      case SMSBlockType.EMOJI:
        return 'Emoji';
      default:
        return 'Unknown';
    }
  };

  const getBlockTypeColor = (type: SMSBlockType) => {
    switch (type) {
      case SMSBlockType.TEXT:
        return 'success';
      case SMSBlockType.VARIABLE:
        return 'info';
      case SMSBlockType.LINK:
        return 'attention';
      case SMSBlockType.PHONE:
        return 'warning';
      case SMSBlockType.EMOJI:
        return 'new';
      default:
        return 'subdued';
    }
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case SMSBlockType.TEXT:
        const textBlock = block as any;
        return (
          <Text as="p" variant="bodyMd">
            {textBlock.text || 'Enter text...'}
          </Text>
        );

      case SMSBlockType.VARIABLE:
        const variableBlock = block as any;
        return (
          <BlockStack gap="200">
            <Text as="p" variant="bodyMd" fontWeight="medium">
              Variable: {variableBlock.variable_name || 'unnamed'}
            </Text>
            {variableBlock.default_value && (
              <Text as="p" variant="bodyMd" tone="subdued">
                Default: {variableBlock.default_value}
              </Text>
            )}
          </BlockStack>
        );

      case SMSBlockType.LINK:
        const linkBlock = block as any;
        return (
          <BlockStack gap="200">
            <Text as="p" variant="bodyMd" fontWeight="medium">
              URL: {linkBlock.url || 'Enter URL...'}
            </Text>
            {linkBlock.text && (
              <Text as="p" variant="bodyMd" tone="subdued">
                Display text: {linkBlock.text}
              </Text>
            )}
            {linkBlock.shorten && (
              <Badge tone="info">Shortened URL</Badge>
            )}
          </BlockStack>
        );

      case SMSBlockType.PHONE:
        const phoneBlock = block as any;
        return (
          <BlockStack gap="200">
            <Text as="p" variant="bodyMd" fontWeight="medium">
              Phone: {phoneBlock.phone_number || 'Enter phone number...'}
            </Text>
            {phoneBlock.country_code && (
              <Text as="p" variant="bodyMd" tone="subdued">
                Country code: {phoneBlock.country_code}
              </Text>
            )}
          </BlockStack>
        );

      case SMSBlockType.EMOJI:
        const emojiBlock = block as any;
        return (
          <InlineStack align="center" gap="200">
            <Text as="span" variant="headingLg">{emojiBlock.emoji || '😀'}</Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              Emoji: {emojiBlock.emoji || 'Select emoji'}
            </Text>
          </InlineStack>
        );

      default:
        return <Text as="p" variant="bodyMd">Unknown block type</Text>;
    }
  };

  return (
    <Card>
      <BlockStack gap="300">
        <InlineStack align="space-between" blockAlign="center">
          <InlineStack align="start" gap="200" blockAlign="center">
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
              tone="critical"
            />
          </ButtonGroup>
        </InlineStack>

        {renderBlockContent()}
      </BlockStack>
    </Card>
  );
};
