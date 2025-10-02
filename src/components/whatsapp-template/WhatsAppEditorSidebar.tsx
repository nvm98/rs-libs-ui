import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  BlockStack,
  Select,
  InlineStack,
} from '@shopify/polaris';
import { ChevronLeftIcon } from '@shopify/polaris-icons';
import { WhatsAppTemplate, WhatsAppBlockType } from './types';
import { useBlockManager } from './hooks/useBlockManager';
import { BlockItem } from './blocks/BlockItem';
import { VariablePanel } from './VariablePanel';
import { AVAILABLE_LANGUAGES } from './constants/languages';

interface WhatsAppEditorSidebarProps {
  templates?: WhatsAppTemplate[];
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
  onTemplatesUpdate?: (templates: WhatsAppTemplate[]) => void;
  template: WhatsAppTemplate;
  onTemplateChange: (template: WhatsAppTemplate) => void;
  // Mobile full-screen mode props
  isFullScreen?: boolean;
  onClose?: () => void;
  selectedBlockType?: WhatsAppBlockType | null;
  onBlockTypeSelect?: (blockType: WhatsAppBlockType | null) => void;
}

export const WhatsAppEditorSidebar: React.FC<WhatsAppEditorSidebarProps> = ({
  templates = [],
  selectedLanguage = 'en',
  onLanguageChange,
  onTemplatesUpdate,
  template,
  onTemplateChange,
  isFullScreen = false,
  onClose,
  selectedBlockType: externalSelectedBlockType,
  onBlockTypeSelect
}) => {
  const [internalSelectedBlockType, setInternalSelectedBlockType] = useState<WhatsAppBlockType | null>(null);
  const [showVariables, setShowVariables] = useState(false);
  const [showAddLanguageForm, setShowAddLanguageForm] = useState(false);
  const [selectedNewLanguage, setSelectedNewLanguage] = useState('');
  const { updateBlock } = useBlockManager(template, onTemplateChange);

  // Lấy danh sách ngôn ngữ có sẵn từ templates
  const availableLanguages = useMemo(() => {
    const templateLocales = new Set(templates.map(template => template.locale));
    const filteredLanguages = AVAILABLE_LANGUAGES.filter(lang =>
      templateLocales.has(lang.value)
    );
    if (!templateLocales.has('en')) {
      filteredLanguages.unshift({ value: 'en', label: 'English' });
    }
    return filteredLanguages;
  }, [templates]);

  // Lấy danh sách ngôn ngữ chưa có template
  const getAvailableLanguagesForSelection = useCallback(() => {
    const existingLanguageCodes = availableLanguages.map(lang => lang.value);
    return AVAILABLE_LANGUAGES.filter(lang => !existingLanguageCodes.includes(lang.value));
  }, [availableLanguages]);

  const handleLanguageChange = useCallback((value: string) => {
    if (onLanguageChange) {
      onLanguageChange(value);
    }
  }, [onLanguageChange]);

  const handleAddLanguage = useCallback(() => {
    if (selectedNewLanguage && onTemplatesUpdate) {
      const languageToAdd = AVAILABLE_LANGUAGES.find(lang => lang.value === selectedNewLanguage);
      if (languageToAdd) {
        const englishTemplate = templates.find(template => template.locale === 'en');
        const newTemplate: WhatsAppTemplate = {
          id: '',
          shop: '',
          name: `WhatsApp Template ${languageToAdd.label}`,
          content: englishTemplate?.content || '',
          locale: languageToAdd.value,
          type: 'whatsapp' as const,
          engine: 'liquid' as const,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          blocks: englishTemplate?.blocks ? [...englishTemplate.blocks] : [],
          category: englishTemplate?.category || 'MARKETING',
          language: languageToAdd.value,
          status: 'PENDING' as const
        };
        const updatedTemplates = [...templates, newTemplate];

        // Cập nhật templates ngay lập tức
        onTemplatesUpdate(updatedTemplates);

        // Chuyển sang ngôn ngữ vừa thêm
        if (onLanguageChange) {
          onLanguageChange(languageToAdd.value);
        }
        setSelectedNewLanguage('');
        setShowAddLanguageForm(false);
      }
    }
  }, [selectedNewLanguage, templates, onTemplatesUpdate, onLanguageChange]);

  // Tạo options cho language selector với option "Add new language"
  const languageOptions = [
    ...availableLanguages.map(lang => ({ label: lang.label, value: lang.value })),
    { label: '+ Add new language', value: 'add_new' }
  ];

  const handleLanguageSelectChange = useCallback((value: string) => {
    if (value === 'add_new') {
      setShowAddLanguageForm(true);
    } else {
      handleLanguageChange(value);
    }
  }, [handleLanguageChange]);

  const handleFormClose = useCallback(() => {
    setShowAddLanguageForm(false);
    setSelectedNewLanguage('');
  }, []);

  // Use external selectedBlockType if provided (for full-screen mode), otherwise use internal state
  const selectedBlockType = externalSelectedBlockType !== undefined ? externalSelectedBlockType : internalSelectedBlockType;
  const setSelectedBlockType = onBlockTypeSelect || setInternalSelectedBlockType;

  const getBlockTitle = (type: WhatsAppBlockType) => {
    const titles = {
      header: 'Header Settings',
      body: 'Body Settings',
      footer: 'Footer Settings',
      buttons: 'Buttons Settings'
    };
    return titles[type] || 'Block Settings';
  };

  return (
    <div style={{
      width: isFullScreen ? '100%' : '320px',
      height: isFullScreen ? '100vh' : 'auto',
      borderRight: isFullScreen ? 'none' : '1px solid #e1e3e5',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      position: isFullScreen ? 'fixed' : 'relative',
      top: isFullScreen ? 0 : 'auto',
      left: isFullScreen ? 0 : 'auto',
      right: isFullScreen ? 0 : 'auto',
      bottom: isFullScreen ? 0 : 'auto',
      zIndex: isFullScreen ? 50 : 'auto'
    }}>
      <div style={{
        flex: 1,
        paddingBottom: isFullScreen ? '16px' : '60px',
        overflowY: 'auto'
      }}>
        <Box width="100%">
          <Box padding={'200'} width="100%">
            <InlineStack align="space-between" blockAlign="center" gap={"200"}>
              <InlineStack gap={"200"}>
                {isFullScreen && (
                  <Button onClick={onClose} variant='plain' icon={ChevronLeftIcon} accessibilityLabel="Back" />
                )}
                <Text as="h3" variant="headingSm">{ !selectedBlockType || !isFullScreen ? 'Settings' : getBlockTitle(selectedBlockType)}</Text>
              </InlineStack>
              <div style={{ minWidth: '150px' }}>
                <Select
                  label=""
                  options={languageOptions}
                  value={selectedLanguage}
                  onChange={handleLanguageSelectChange}
                  placeholder="Select language"
                />
              </div>
            </InlineStack>
          </Box>

          {/* Form thêm ngôn ngữ mới */}
          {showAddLanguageForm && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              border: '1px solid #e1e3e5',
              borderRadius: '8px',
              backgroundColor: '#f9fafb'
            }}>
              <div>
                <Select
                  label="Select Language"
                  options={getAvailableLanguagesForSelection().map(lang => ({
                    label: lang.label,
                    value: lang.value
                  }))}
                  onChange={setSelectedNewLanguage}
                  value={selectedNewLanguage}
                  placeholder="Choose a language to add"
                />
              </div>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <Button
                  variant="primary"
                  onClick={handleAddLanguage}
                  disabled={!selectedNewLanguage}
                  size="slim"
                >
                  Add Language
                </Button>
                <Button
                  onClick={handleFormClose}
                  size="slim"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <BlockStack gap="100">
            {/* Existing Blocks */}
            {template.blocks.map(block => (
                <BlockItem
                  key={block.id}
                  block={block}
                  isSelected={selectedBlockType === block.type}
                  onSelect={() => setSelectedBlockType(
                    selectedBlockType === block.type ? null : block.type
                  )}
                  onToggleVisibility={() => updateBlock(block.type, { visible: block.visible !== false ? false : true })}
                  onUpdate={(updates) => updateBlock(block.type, updates)}
                />
              ))}
          </BlockStack>
        </Box>
      </div>

      <VariablePanel
        showVariables={showVariables}
        setShowVariables={setShowVariables}
      />
    </div>
  );
};
