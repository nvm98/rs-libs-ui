import React from 'react';
import {
  Card,
  BlockStack,
  TextField,
  Select,
  Button,
  Text,
  Checkbox
} from '@shopify/polaris';
import { WebPushBlock, WebPushBlockType } from './types';
import { WEB_PUSH_DIRECTIONS, WEB_PUSH_LANGUAGES, DEFAULT_VIBRATION_PATTERNS, MAX_ACTIONS } from './constants';

interface WebPushBlockSettingsProps {
  block: WebPushBlock;
  onUpdate: (updates: Partial<WebPushBlock>) => void;
}

export const WebPushBlockSettings: React.FC<WebPushBlockSettingsProps> = ({ block, onUpdate }) => {
  const renderSettings = () => {
    switch (block.type) {
      case WebPushBlockType.TITLE:
        const titleBlock = block as any;
        return (
          <TextField
            label="Title Text"
            value={titleBlock.text || ''}
            onChange={(value) => onUpdate({ text: value })}
            placeholder="Enter notification title"
            maxLength={50}
            showCharacterCount
            autoComplete="off"
          />
        );

      case WebPushBlockType.BODY:
        const bodyBlock = block as any;
        return (
          <TextField
            label="Body Text"
            value={bodyBlock.text || ''}
            onChange={(value) => onUpdate({ text: value })}
            multiline={4}
            placeholder="Enter notification body text"
            maxLength={160}
            showCharacterCount
            autoComplete="off"
          />
        );

      case WebPushBlockType.ICON:
        const iconBlock = block as any;
        return (
          <BlockStack gap="300">
            <TextField
              label="Icon URL"
              value={iconBlock.icon_url || ''}
              onChange={(value) => onUpdate({ icon_url: value })}
              placeholder="https://example.com/icon.png"
              autoComplete="off"
            />
            <TextField
              label="Icon Size (px)"
              type="number"
              value={iconBlock.size?.toString() || ''}
              onChange={(value) => onUpdate({ size: parseInt(value) || undefined })}
              placeholder="24"
              autoComplete="off"
            />
          </BlockStack>
        );

      case WebPushBlockType.IMAGE:
        const imageBlock = block as any;
        return (
          <BlockStack gap="300">
            <TextField
              label="Image URL"
              value={imageBlock.image_url || ''}
              onChange={(value) => onUpdate({ image_url: value })}
              placeholder="https://example.com/image.png"
              autoComplete="off"
            />
            <TextField
              label="Alt Text"
              value={imageBlock.alt_text || ''}
              onChange={(value) => onUpdate({ alt_text: value })}
              placeholder="Image description"
              autoComplete="off"
            />
          </BlockStack>
        );

      case WebPushBlockType.BADGE:
        const badgeBlock = block as any;
        return (
          <TextField
            label="Badge URL"
            value={badgeBlock.badge_url || ''}
            onChange={(value) => onUpdate({ badge_url: value })}
            placeholder="https://example.com/badge.png"
            autoComplete="off"
          />
        );

      case WebPushBlockType.ACTIONS:
        const actionsBlock = block as any;
        const handleActionChange = (index: number, field: string, value: string) => {
          const newActions = [...(actionsBlock.actions || [])];
          newActions[index] = { ...newActions[index], [field]: value };
          onUpdate({ actions: newActions });
        };

        const addAction = () => {
          if ((actionsBlock.actions || []).length >= MAX_ACTIONS) return;
          const newActions = [...(actionsBlock.actions || []), { action: '', title: '' }];
          onUpdate({ actions: newActions });
        };

        const removeAction = (index: number) => {
          const newActions = [...(actionsBlock.actions || [])];
          newActions.splice(index, 1);
          onUpdate({ actions: newActions });
        };

        return (
          <BlockStack gap="300">
            {(actionsBlock.actions || []).map((action: any, index: number) => (
              <Card key={index}>
                <div style={{ padding: '16px' }}>
                  <BlockStack gap="300">
                    <TextField
                      label="Action ID"
                      value={action.action}
                      onChange={(value) => handleActionChange(index, 'action', value)}
                      placeholder="action_id"
                      autoComplete="off"
                    />
                    <TextField
                      label="Action Title"
                      value={action.title}
                      onChange={(value) => handleActionChange(index, 'title', value)}
                      placeholder="Button text"
                      autoComplete="off"
                    />
                    <TextField
                      label="Icon URL (optional)"
                      value={action.icon || ''}
                      onChange={(value) => handleActionChange(index, 'icon', value)}
                      placeholder="https://example.com/icon.png"
                      autoComplete="off"
                    />
                    <Button tone="critical" onClick={() => removeAction(index)}>Remove Action</Button>
                  </BlockStack>
                </div>
              </Card>
            ))}
            {(actionsBlock.actions || []).length < MAX_ACTIONS && (
              <Button onClick={addAction}>Add Action</Button>
            )}
            <Text as="p" variant="bodyMd" tone="subdued">
              Maximum {MAX_ACTIONS} actions allowed
            </Text>
          </BlockStack>
        );

      case WebPushBlockType.VARIABLE:
        const variableBlock = block as any;
        return (
          <BlockStack gap="300">
            <TextField
              label="Variable Name"
              value={variableBlock.variable_name || ''}
              onChange={(value) => onUpdate({ variable_name: value })}
              placeholder="customer_name"
              autoComplete="off"
            />
            <TextField
              label="Default Value"
              value={variableBlock.default_value || ''}
              onChange={(value) => onUpdate({ default_value: value })}
              placeholder="Default value if variable is empty"
              autoComplete="off"
            />
          </BlockStack>
        );

      case WebPushBlockType.SETTINGS:
        const settingsBlock = block as any;
        return (
          <BlockStack gap="300">
            <Checkbox
              label="Require Interaction"
              checked={settingsBlock.requireInteraction || false}
              onChange={(value) => onUpdate({ requireInteraction: value })}
              helpText="Notification will remain visible until user interacts with it"
            />
            <Checkbox
              label="Silent"
              checked={settingsBlock.silent || false}
              onChange={(value) => onUpdate({ silent: value })}
              helpText="No sound or vibration"
            />
            <Checkbox
              label="Renotify"
              checked={settingsBlock.renotify || false}
              onChange={(value) => onUpdate({ renotify: value })}
              helpText="Notify again even if tag is the same"
            />
            <TextField
              label="Tag"
              value={settingsBlock.tag || ''}
              onChange={(value) => onUpdate({ tag: value })}
              placeholder="notification_tag"
              helpText="Groups notifications with the same tag"
              autoComplete="off"
            />
            <Select
              label="Text Direction"
              options={WEB_PUSH_DIRECTIONS}
              value={settingsBlock.dir || 'auto'}
              onChange={(value) => onUpdate({ dir: value as any })}
            />
            <Select
              label="Language"
              options={WEB_PUSH_LANGUAGES}
              value={settingsBlock.lang || 'en'}
              onChange={(value) => onUpdate({ lang: value })}
            />
            <Select
              label="Vibration Pattern"
              options={DEFAULT_VIBRATION_PATTERNS}
              value={settingsBlock.vibrate?.join(',') || ''}
              onChange={(value) => onUpdate({
                vibrate: value ? value.split(',').map(v => parseInt(v.trim())) : undefined
              })}
            />
          </BlockStack>
        );

      default:
        return <Text as="p" variant="bodyMd" tone="subdued">No settings for this block type.</Text>;
    }
  };

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Text as="h2" variant="headingMd">
            Settings: {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
          </Text>
        </div>
        {renderSettings()}
      </div>
    </Card>
  );
};
