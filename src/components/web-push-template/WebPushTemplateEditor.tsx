import React, { useState, useCallback } from 'react';
import {
  Card,
  Layout,
  Page,
  Button,
  BlockStack,
  Text,
  TextField,
  ButtonGroup,
  Banner,
  Checkbox
} from '@shopify/polaris';
import { WebPushTemplate, WebPushBlock, WebPushBlockType } from './types';
import { WEB_PUSH_BLOCK_TYPES } from './constants';
import { WebPushBlockSettings } from './WebPushBlockSettings';
// import { WebPushBlockRenderer } from './WebPushBlockRenderer';
// import { WebPushPreviewPanel } from './WebPushPreviewPanel';

interface WebPushTemplateEditorProps {
  template?: WebPushTemplate;
  onSave: (template: WebPushTemplate) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string;
}

export const WebPushTemplateEditor: React.FC<WebPushTemplateEditorProps> = ({
  template,
  onSave,
  onCancel,
  loading = false,
  error
}) => {
  const [currentTemplate, setCurrentTemplate] = useState<WebPushTemplate>(
    template || {
      name: '',
      content: '',
      locale: 'en',
      type: 'web-push',
      engine: 'liquid',
      is_active: true,
      title: '',
      body: '',
      requireInteraction: false,
      silent: false,
      renotify: false
    }
  );

  const [blocks, setBlocks] = useState<WebPushBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const handleTemplateChange = useCallback((field: keyof WebPushTemplate, value: any) => {
    setCurrentTemplate(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleAddBlock = useCallback((blockType: WebPushBlockType) => {
    const newBlock: WebPushBlock = {
      id: `block_${Date.now()}`,
      type: blockType,
      order: blocks.length,
      settings: {}
    } as WebPushBlock;

    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  }, [blocks.length]);

  const handleBlockUpdate = useCallback((blockId: string, updates: any) => {
    setBlocks(prev => prev.map(block =>
      block.id === blockId ? { ...block, ...updates } as WebPushBlock : block
    ));
  }, []);

  const handleBlockDelete = useCallback((blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  }, [selectedBlockId]);

  const handleSave = useCallback(() => {
    const templateToSave: WebPushTemplate = {
      ...currentTemplate,
      blocks: blocks,
      content: JSON.stringify(blocks)
    };
    onSave(templateToSave);
  }, [currentTemplate, blocks, onSave]);

  return (
    <Page
      title="Web Push Template Editor"
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
        <Layout.Section>
          <Card>
            <div style={{ padding: '16px' }}>
              <BlockStack gap="300">
                <TextField
                  label="Template Name"
                  value={currentTemplate.name}
                  onChange={(value) => handleTemplateChange('name', value)}
                  placeholder="Enter template name"
                  autoComplete="off"
                />

                <TextField
                  label="Notification Title"
                  value={currentTemplate.title}
                  onChange={(value) => handleTemplateChange('title', value)}
                  placeholder="Enter notification title"
                  maxLength={50}
                  showCharacterCount
                  autoComplete="off"
                />

                <TextField
                  label="Notification Body"
                  value={currentTemplate.body}
                  onChange={(value) => handleTemplateChange('body', value)}
                  placeholder="Enter notification body"
                  multiline={3}
                  maxLength={160}
                  showCharacterCount
                  autoComplete="off"
                />

                <TextField
                  label="Icon URL"
                  value={currentTemplate.icon || ''}
                  onChange={(value) => handleTemplateChange('icon', value)}
                  placeholder="https://example.com/icon.png"
                  autoComplete="off"
                />

                <TextField
                  label="Image URL"
                  value={currentTemplate.image || ''}
                  onChange={(value) => handleTemplateChange('image', value)}
                  placeholder="https://example.com/image.png"
                  autoComplete="off"
                />

                <BlockStack gap="200">
                  <Checkbox
                    label="Require Interaction"
                    checked={currentTemplate.requireInteraction || false}
                    onChange={(value) => handleTemplateChange('requireInteraction', value)}
                  />
                  <Checkbox
                    label="Silent"
                    checked={currentTemplate.silent || false}
                    onChange={(value) => handleTemplateChange('silent', value)}
                  />
                  <Checkbox
                    label="Renotify"
                    checked={currentTemplate.renotify || false}
                    onChange={(value) => handleTemplateChange('renotify', value)}
                  />
                </BlockStack>

                <TextField
                  label="Description"
                  value={currentTemplate.description || ''}
                  onChange={(value) => handleTemplateChange('description', value)}
                  multiline={3}
                  placeholder="Template description"
                  autoComplete="off"
                />
              </BlockStack>
            </div>
          </Card>

          <Card>
            <div style={{ padding: '16px' }}>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">Add Blocks</Text>
                <ButtonGroup variant="segmented">
                  {WEB_PUSH_BLOCK_TYPES.slice(0, 4).map(blockType => (
                    <Button
                      key={blockType.type}
                      onClick={() => handleAddBlock(blockType.type)}
                      size="slim"
                    >
                      {blockType.label}
                    </Button>
                  ))}
                </ButtonGroup>
                <ButtonGroup variant="segmented">
                  {WEB_PUSH_BLOCK_TYPES.slice(4).map(blockType => (
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
            </div>

            <div style={{ padding: '16px', borderTop: '1px solid #e1e3e5' }}>
              <BlockStack gap="300">
                {blocks.map(block => (
                  <div key={block.id} style={{ padding: '8px', border: '1px solid #e1e3e5', borderRadius: '4px' }}>
                    <Text as="p" variant="bodyMd">Block: {block.type}</Text>
                    <Button size="slim" onClick={() => handleBlockDelete(block.id)}>Delete</Button>
                  </div>
                ))}
                {blocks.length === 0 && (
                  <Text as="p" variant="bodyMd" tone="subdued">
                    No blocks added yet. Click on the buttons above to add blocks.
                  </Text>
                )}
              </BlockStack>
            </div>
          </Card>

          {selectedBlockId && (
            <WebPushBlockSettings
              block={blocks.find(b => b.id === selectedBlockId)!}
              onUpdate={(updates: any) => handleBlockUpdate(selectedBlockId, updates)}
            />
          )}
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: '16px' }}>
              <Text as="h2" variant="headingMd">Preview</Text>
              <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f6f6f7', borderRadius: '4px' }}>
                <Text as="p" variant="bodyMd">Preview panel would be rendered here</Text>
                <Text as="p" variant="bodySm" tone="subdued">Template: {currentTemplate.name}</Text>
                <Text as="p" variant="bodySm" tone="subdued">Blocks: {blocks.length}</Text>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
