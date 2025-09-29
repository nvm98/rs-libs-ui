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
import { WebPushBlock, WebPushBlockType } from './types';

interface WebPushBlockRendererProps {
  block: WebPushBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<WebPushBlock>) => void;
  onDelete: () => void;
}

export const WebPushBlockRenderer: React.FC<WebPushBlockRendererProps> = ({
  block,
  isSelected,
  onSelect,
  onDelete
}) => {
  const getBlockTypeLabel = (type: WebPushBlockType) => {
    switch (type) {
      case WebPushBlockType.TITLE:
        return 'Title';
      case WebPushBlockType.BODY:
        return 'Body';
      case WebPushBlockType.ICON:
        return 'Icon';
      case WebPushBlockType.IMAGE:
        return 'Image';
      case WebPushBlockType.BADGE:
        return 'Badge';
      case WebPushBlockType.ACTIONS:
        return 'Actions';
      case WebPushBlockType.VARIABLE:
        return 'Variable';
      case WebPushBlockType.SETTINGS:
        return 'Settings';
      default:
        return 'Unknown';
    }
  };

  const getBlockTypeColor = (type: WebPushBlockType) => {
    switch (type) {
      case WebPushBlockType.TITLE:
        return 'info';
      case WebPushBlockType.BODY:
        return 'success';
      case WebPushBlockType.ICON:
        return 'attention';
      case WebPushBlockType.IMAGE:
        return 'warning';
      case WebPushBlockType.BADGE:
        return 'new';
      case WebPushBlockType.ACTIONS:
        return 'critical';
      case WebPushBlockType.VARIABLE:
        return 'subdued';
      case WebPushBlockType.SETTINGS:
        return 'info';
      default:
        return 'subdued';
    }
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case WebPushBlockType.TITLE:
        const titleBlock = block as any;
        return (
          <Text as="p" variant="bodyMd" fontWeight="medium">
            {titleBlock.text || 'Enter title...'}
          </Text>
        );

      case WebPushBlockType.BODY:
        const bodyBlock = block as any;
        return (
          <Text as="p" variant="bodyMd">
            {bodyBlock.text || 'Enter body text...'}
          </Text>
        );

      case WebPushBlockType.ICON:
        const iconBlock = block as any;
        return (
          <BlockStack gap="200">
            <Text as="p" variant="bodyMd" tone="subdued">
              Icon URL: {iconBlock.icon_url || 'Not set'}
            </Text>
            {iconBlock.size && (
              <Text as="p" variant="bodyMd" tone="subdued">
                Size: {iconBlock.size}px
              </Text>
            )}
          </BlockStack>
        );

      case WebPushBlockType.IMAGE:
        const imageBlock = block as any;
        return (
          <BlockStack gap="200">
            <Text as="p" variant="bodyMd" tone="subdued">
              Image URL: {imageBlock.image_url || 'Not set'}
            </Text>
            {imageBlock.alt_text && (
              <Text as="p" variant="bodyMd" tone="subdued">
                Alt text: {imageBlock.alt_text}
              </Text>
            )}
          </BlockStack>
        );

      case WebPushBlockType.BADGE:
        const badgeBlock = block as any;
        return (
          <Text as="p" variant="bodyMd" tone="subdued">
            Badge URL: {badgeBlock.badge_url || 'Not set'}
          </Text>
        );

      case WebPushBlockType.ACTIONS:
        const actionsBlock = block as any;
        return (
          <BlockStack gap="200">
            {actionsBlock.actions && actionsBlock.actions.length > 0 ? (
              actionsBlock.actions.map((action: any, index: number) => (
                <InlineStack key={index} align="center" gap="200">
                  <Badge tone="info">{action.action}</Badge>
                  <Text as="p" variant="bodyMd">{action.title}</Text>
                </InlineStack>
              ))
            ) : (
              <Text as="p" variant="bodyMd" tone="subdued">
                No actions added
              </Text>
            )}
          </BlockStack>
        );

      case WebPushBlockType.VARIABLE:
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

      case WebPushBlockType.SETTINGS:
        const settingsBlock = block as any;
        const settings = [];
        if (settingsBlock.requireInteraction) settings.push('Require Interaction');
        if (settingsBlock.silent) settings.push('Silent');
        if (settingsBlock.renotify) settings.push('Renotify');
        if (settingsBlock.tag) settings.push(`Tag: ${settingsBlock.tag}`);
        
        return (
          <BlockStack gap="200">
            {settings.length > 0 ? (
              settings.map((setting, index) => (
                <Text key={index} as="p" variant="bodyMd" tone="subdued">
                  • {setting}
                </Text>
              ))
            ) : (
              <Text as="p" variant="bodyMd" tone="subdued">
                No settings configured
              </Text>
            )}
          </BlockStack>
        );

      default:
        return <Text as="p" variant="bodyMd">Unknown block type</Text>;
    }
  };

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <InlineStack align="space-between">
          <InlineStack align="center" gap="200">
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

        <div style={{ marginTop: '12px' }}>
          {renderBlockContent()}
        </div>
      </div>
    </Card>
  );
};
