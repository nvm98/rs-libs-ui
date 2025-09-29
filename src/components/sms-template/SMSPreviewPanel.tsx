import React from 'react';
import {
  Card,
  BlockStack,
  InlineStack,
  Text,
  Badge
} from '@shopify/polaris';
import { SMSTemplate, SMSBlock, SMSBlockType } from './types';

interface SMSPreviewPanelProps {
  template: SMSTemplate;
  blocks: SMSBlock[];
}

export const SMSPreviewPanel: React.FC<SMSPreviewPanelProps> = ({
  template,
  blocks
}) => {
  const renderBlock = (block: SMSBlock) => {
    switch (block.type) {
      case SMSBlockType.TEXT:
        const textBlock = block as any;
        return textBlock.text || '';

      case SMSBlockType.VARIABLE:
        const variableBlock = block as any;
        return `{{${variableBlock.variable_name || 'variable'}}}`;

      case SMSBlockType.LINK:
        const linkBlock = block as any;
        return linkBlock.text || linkBlock.url || 'https://example.com';

      case SMSBlockType.PHONE:
        const phoneBlock = block as any;
        return phoneBlock.phone_number || '+1234567890';

      case SMSBlockType.EMOJI:
        const emojiBlock = block as any;
        return emojiBlock.emoji || '😀';

      default:
        return '';
    }
  };

  const previewMessage = template.message || blocks.map(renderBlock).join(' ');
  const messageLength = previewMessage.length;
  const maxLength = template.max_length || 160;
  const encoding = template.encoding || 'GSM7';
  
  const getSMSCount = () => {
    if (encoding === 'GSM7') {
      if (messageLength <= 160) return 1;
      return Math.ceil(messageLength / 153);
    } else {
      if (messageLength <= 70) return 1;
      return Math.ceil(messageLength / 67);
    }
  };

  const smsCount = getSMSCount();

  const previewStyles: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e1e3e5',
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: '1.4'
  };

  const phoneStyles: React.CSSProperties = {
    backgroundColor: '#000',
    color: '#00ff00',
    padding: '12px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '12px',
    maxWidth: '300px',
    margin: '0 auto'
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">SMS Preview</Text>

        <BlockStack gap="400">
          {/* Phone Preview */}
          <div style={phoneStyles}>
            <div style={{ marginBottom: '8px', fontSize: '10px', color: '#888' }}>
              {template.sender_id || 'SENDER'} • now
            </div>
            <div>{previewMessage || 'Your SMS message will appear here...'}</div>
          </div>

          {/* Message Stats */}
          <InlineStack align="space-around">
            <BlockStack align="center" gap="100">
              <Text as="span" variant="headingMd">{messageLength}</Text>
              <Text as="p" variant="bodyMd" tone="subdued">Characters</Text>
            </BlockStack>
            <BlockStack align="center" gap="100">
              <Text as="span" variant="headingMd">{smsCount}</Text>
              <Text as="p" variant="bodyMd" tone="subdued">SMS Parts</Text>
            </BlockStack>
            <BlockStack align="center" gap="100">
              <Badge tone={encoding === 'GSM7' ? 'success' : 'info'}>
                {encoding}
              </Badge>
              <Text as="p" variant="bodyMd" tone="subdued">Encoding</Text>
            </BlockStack>
          </InlineStack>

          {/* Length Warning */}
          {messageLength > maxLength && (
            <div style={{
              padding: '12px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '4px'
            }}>
              <Text as="p" variant="bodyMd" tone="caution">
                Message exceeds {maxLength} characters and will be sent as {smsCount} SMS parts.
              </Text>
            </div>
          )}

          {/* Raw Preview */}
          <BlockStack gap="200">
            <Text variant="headingXs" as="h3">Raw Message</Text>
            <div style={previewStyles}>
              {previewMessage || 'Empty message'}
            </div>
          </BlockStack>
        </BlockStack>

        <BlockStack gap="200">
          <Text as="h3" variant="headingXs">Template Info</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Name: {template.name || 'Untitled'}
          </Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Encoding: {encoding} ({encoding === 'GSM7' ? '160' : '70'} chars per SMS)
          </Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Blocks: {blocks.length}
          </Text>
          {template.sender_id && (
            <Text as="p" variant="bodyMd" tone="subdued">
              Sender ID: {template.sender_id}
            </Text>
          )}
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
