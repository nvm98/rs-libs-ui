import React, { useState, useCallback } from 'react';
import {
  Card,
  Layout,
  Page,
  Button,
  Text,
  TextField,
  Select,
  ButtonGroup,
  Banner,
  ProgressBar,
  BlockStack,
  InlineStack
} from '@shopify/polaris';
import { SMSTemplate, SMSBlock, SMSBlockType } from './types';
import { SMS_BLOCK_TYPES, SMS_ENCODINGS, MAX_SMS_LENGTH_GSM7, MAX_SMS_LENGTH_UCS2 } from './constants';
import { SMSBlockRenderer } from './SMSBlockRenderer';
import { SMSPreviewPanel } from './SMSPreviewPanel';
import { SMSBlockSettings } from './SMSBlockSettings';

interface SMSTemplateEditorProps {
  template?: SMSTemplate;
  onSave: (template: SMSTemplate) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string;
}

export const SMSTemplateEditor: React.FC<SMSTemplateEditorProps> = ({
  template,
  onSave,
  onCancel,
  loading = false,
  error
}) => {
  const [currentTemplate, setCurrentTemplate] = useState<SMSTemplate>(
    template || {
      name: '',
      content: '',
      locale: 'en',
      type: 'sms',
      engine: 'liquid',
      is_active: true,
      message: '',
      encoding: 'GSM7',
      max_length: MAX_SMS_LENGTH_GSM7
    }
  );

  const [blocks, setBlocks] = useState<SMSBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const handleTemplateChange = useCallback((field: keyof SMSTemplate, value: any) => {
    setCurrentTemplate(prev => {
      const updated = { ...prev, [field]: value };
      
      // Update max_length when encoding changes
      if (field === 'encoding') {
        updated.max_length = value === 'GSM7' ? MAX_SMS_LENGTH_GSM7 : MAX_SMS_LENGTH_UCS2;
      }
      
      return updated;
    });
  }, []);

  const handleAddBlock = useCallback((blockType: SMSBlockType) => {
    const newBlock: SMSBlock = {
      id: `block_${Date.now()}`,
      type: blockType,
      order: blocks.length,
      settings: {}
    } as SMSBlock;

    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  }, [blocks.length]);

  const handleBlockUpdate = useCallback((blockId: string, updates: Partial<SMSBlock>) => {
    setBlocks(prev => prev.map(block =>
      block.id === blockId ? { ...block, ...updates } as SMSBlock : block
    ));
  }, []);

  const handleBlockDelete = useCallback((blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  }, [selectedBlockId]);

  const handleSave = useCallback(() => {
    const templateToSave: SMSTemplate = {
      ...currentTemplate,
      blocks: blocks,
      content: JSON.stringify(blocks)
    };
    onSave(templateToSave);
  }, [currentTemplate, blocks, onSave]);

  const encodingOptions = SMS_ENCODINGS.map(enc => ({
    label: enc.label,
    value: enc.value
  }));

  const messageLength = currentTemplate.message.length;
  const maxLength = currentTemplate.max_length || MAX_SMS_LENGTH_GSM7;
  const lengthPercentage = (messageLength / maxLength) * 100;

  return (
    <Page
      title="SMS Template Editor"
      primaryAction={{
        content: 'Save Template',
        onAction: handleSave,
        loading
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: onCancel
        }
      ]}
    >
      {error && (
        <Banner tone="critical" title="Error">
          {error}
        </Banner>
      )}

      <Layout>
        <Layout.Section variant="oneHalf">
          <Card>
            <BlockStack gap="400">
              <TextField
                label="Template Name"
                value={currentTemplate.name}
                onChange={(value) => handleTemplateChange('name', value)}
                placeholder="Enter template name"
                autoComplete="off"
              />

              <Select
                label="Encoding"
                options={encodingOptions}
                value={currentTemplate.encoding || 'GSM7'}
                onChange={(value) => handleTemplateChange('encoding', value)}
              />

              <TextField
                label="SMS Message"
                value={currentTemplate.message}
                onChange={(value) => handleTemplateChange('message', value)}
                placeholder="Enter SMS message"
                multiline={4}
                maxLength={maxLength}
                showCharacterCount
                autoComplete="off"
              />

              <BlockStack gap="200">
                <Text as="p" variant="bodyMd">Message Length: {messageLength}/{maxLength}</Text>
                <ProgressBar
                  progress={lengthPercentage}
                />
              </BlockStack>

              <TextField
                label="Sender ID (optional)"
                value={currentTemplate.sender_id || ''}
                onChange={(value) => handleTemplateChange('sender_id', value)}
                placeholder="Your Brand"
                maxLength={11}
                autoComplete="off"
              />

              <TextField
                label="Description"
                value={currentTemplate.description || ''}
                onChange={(value) => handleTemplateChange('description', value)}
                multiline={3}
                placeholder="Template description"
                autoComplete="off"
              />
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Add Blocks</Text>
              <ButtonGroup variant="segmented">
                {SMS_BLOCK_TYPES.map(blockType => (
                  <Button
                    key={blockType.type}
                    onClick={() => handleAddBlock(blockType.type)}
                    size="slim"
                  >
                    {blockType.label}
                  </Button>
                ))}
              </ButtonGroup>
            </BlockStack>
            <BlockStack gap="400">
              {blocks.map(block => (
                <SMSBlockRenderer
                  key={block.id}
                  block={block}
                  isSelected={selectedBlockId === block.id}
                  onSelect={() => setSelectedBlockId(block.id)}
                  onUpdate={(updates) => handleBlockUpdate(block.id, updates)}
                  onDelete={() => handleBlockDelete(block.id)}
                />
              ))}
              {blocks.length === 0 && (
                <Text as="p" variant="bodyMd" tone="subdued">
                  No blocks added yet. Click on the buttons above to add blocks.
                </Text>
              )}
            </BlockStack>
          </Card>

          {selectedBlockId && (
            <SMSBlockSettings
              block={blocks.find(b => b.id === selectedBlockId)!}
              onUpdate={(updates) => handleBlockUpdate(selectedBlockId, updates)}
            />
          )}
        </Layout.Section>

        <Layout.Section variant="oneHalf">
          <SMSPreviewPanel
            template={currentTemplate}
            blocks={blocks}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
