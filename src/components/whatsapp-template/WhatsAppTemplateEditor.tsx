import React, { useState, useCallback } from 'react';
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import {
  Card,
  Layout,
  Button,
  Text,
  TextField,
  Select,
  ButtonGroup,
  Banner,
  BlockStack
} from '@shopify/polaris';
import { WhatsAppTemplate, WhatsAppBlock, WhatsAppBlockType } from './types';
import { WHATSAPP_CATEGORIES, WHATSAPP_BLOCK_TYPES } from './constants';
import { WhatsAppPreviewPanel } from './WhatsAppPreviewPanel';
import { WhatsAppBlockRenderer } from './WhatsAppBlockRenderer';
import { WhatsAppBlockSettings } from './WhatsAppBlockSettings';
import { useLocale } from './hooks';

interface WhatsAppTemplateEditorProps {
  isOpen: boolean;
  template?: WhatsAppTemplate;
  onSave: (template: WhatsAppTemplate) => void;
  onClose: () => void;
  loading?: boolean;
  error?: string;
}

export const WhatsAppTemplateEditor: React.FC<WhatsAppTemplateEditorProps> = ({
  isOpen,
  template,
  onSave,
  onClose,
  loading = false,
  error
}) => {
  const initialTemplate = template || {
    name: '',
    content: '',
    locale: 'en',
    type: 'whatsapp' as const,
    engine: 'liquid' as const,
    is_active: true,
    category: 'UTILITY' as const,
    language: 'en',
    status: 'PENDING' as const,
    components: []
  };

  const [currentTemplate, setCurrentTemplate] = useState<WhatsAppTemplate>(initialTemplate);
  const { availableLanguages } = useLocale(initialTemplate.locale);

  const [blocks, setBlocks] = useState<WhatsAppBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('mobile');

  const handleTemplateChange = useCallback((field: keyof WhatsAppTemplate, value: any) => {
    setCurrentTemplate(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleAddBlock = useCallback((blockType: WhatsAppBlockType) => {
    const newBlock: WhatsAppBlock = {
      id: `block_${Date.now()}`,
      type: blockType,
      order: blocks.length,
      settings: {}
    } as WhatsAppBlock;

    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  }, [blocks.length]);

  const handleBlockUpdate = useCallback((blockId: string, updates: Partial<WhatsAppBlock>) => {
    setBlocks(prev => prev.map(block =>
      block.id === blockId ? { ...block, ...updates } as WhatsAppBlock : block
    ));
  }, []);

  const handleBlockDelete = useCallback((blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  }, [selectedBlockId]);

  const handleSave = useCallback(() => {
    const templateToSave: WhatsAppTemplate = {
      ...currentTemplate,
      blocks: blocks,
      content: JSON.stringify(blocks)
    };
    onSave(templateToSave);
  }, [currentTemplate, blocks, onSave]);

  const categoryOptions = WHATSAPP_CATEGORIES.map(cat => ({
    label: cat.label,
    value: cat.value
  }));

  const languageOptions = availableLanguages.map(lang => ({
    label: lang.label,
    value: lang.value
  }));

  return (
    <Modal
      open={isOpen}
      variant="max"
      onHide={onClose}
    >
      <TitleBar title="WhatsApp Template Editor">
        <button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Template'}
        </button>
      </TitleBar>

      {error && (
        <Banner tone="critical" title="Error">
          {error}
        </Banner>
      )}

      <Layout>
        <Layout.Section variant="oneHalf">
          <Card padding="400">
            <BlockStack gap="400">
              <TextField
                label="Template Name"
                value={currentTemplate.name}
                onChange={(value) => handleTemplateChange('name', value)}
                placeholder="Enter template name"
                autoComplete="off"
              />

              <Select
                label="Category"
                options={categoryOptions}
                value={currentTemplate.category}
                onChange={(value) => handleTemplateChange('category', value)}
              />

              <Select
                label="Language"
                options={languageOptions}
                value={currentTemplate.language}
                onChange={(value) => {
                  handleTemplateChange('language', value);
                  handleTemplateChange('locale', value);
                }}
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

          <Card padding="400">
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Template Blocks</Text>

              <BlockStack gap="300">
                <Text as="h3" variant="headingSm">Add Blocks</Text>
                <ButtonGroup>
                  {WHATSAPP_BLOCK_TYPES.map(blockType => (
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

              <BlockStack gap="300">
                {blocks.map(block => (
                  <WhatsAppBlockRenderer
                    key={block.id}
                    block={block}
                    isSelected={selectedBlockId === block.id}
                    onSelect={() => setSelectedBlockId(block.id)}
                    onUpdate={(updates: Partial<WhatsAppBlock>) => handleBlockUpdate(block.id, updates)}
                    onDelete={() => handleBlockDelete(block.id)}
                  />
                ))}
                {blocks.length === 0 && (
                  <Text as="p" variant="bodyMd" tone="subdued">
                    No blocks added yet. Click on the buttons above to add blocks.
                  </Text>
                )}
              </BlockStack>
            </BlockStack>
          </Card>

          {selectedBlockId && (
            <WhatsAppBlockSettings
              block={blocks.find(b => b.id === selectedBlockId)!}
              onUpdate={(updates: Partial<WhatsAppBlock>) => handleBlockUpdate(selectedBlockId, updates)}
            />
          )}
        </Layout.Section>

        <Layout.Section variant="oneHalf">
          <WhatsAppPreviewPanel
            template={currentTemplate}
            blocks={blocks}
            previewMode={previewMode}
            onPreviewModeChange={setPreviewMode}
          />
        </Layout.Section>
      </Layout>
    </Modal>
  );
};
