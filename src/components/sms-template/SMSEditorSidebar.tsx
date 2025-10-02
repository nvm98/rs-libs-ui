import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Text,
  Button,
  Select,
  InlineStack,
  BlockStack,
} from '@shopify/polaris';
import { ChevronLeftIcon } from '@shopify/polaris-icons';
import { SMSTemplate, SMSBlockType } from './types';
import { useBlockManager } from './hooks/useBlockManager';
import { BlockItem } from './blocks/BlockItem';
import { AVAILABLE_LANGUAGES } from './constants/languages';

interface SMSEditorSidebarProps {
  templates?: SMSTemplate[];
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
  onTemplatesUpdate?: (templates: SMSTemplate[]) => void;
  template: SMSTemplate;
  onTemplateChange: (template: SMSTemplate) => void;
  isFullScreen?: boolean;
  onClose?: () => void;
  selectedBlockType?: SMSBlockType | null;
  onBlockTypeSelect?: (blockType: SMSBlockType | null) => void;
}

export const SMSEditorSidebar: React.FC<SMSEditorSidebarProps> = ({
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
  const [internalSelectedBlockType, setInternalSelectedBlockType] = useState<SMSBlockType | null>(null);
  const [showAddLanguageForm, setShowAddLanguageForm] = useState(false);
  const [selectedNewLanguage, setSelectedNewLanguage] = useState('');
  const { updateBlock } = useBlockManager(template, onTemplateChange);

  // Use external selectedBlockType if provided, otherwise use internal state
  const selectedBlockType = externalSelectedBlockType !== undefined ? externalSelectedBlockType : internalSelectedBlockType;
  const setSelectedBlockType = onBlockTypeSelect || setInternalSelectedBlockType;

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
        const newTemplate: SMSTemplate = {
          id: '',
          shop: '',
          name: `SMS Template ${languageToAdd.label}`,
          content: englishTemplate?.content || '',
          locale: languageToAdd.value,
          type: 'sms' as const,
          engine: 'liquid' as const,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          blocks: englishTemplate?.blocks ? [...englishTemplate.blocks] : [
            {
              id: 'body',
              type: 'body',
              content: '',
              visible: true
            }
          ]
        };
        const updatedTemplates = [...templates, newTemplate];

        onTemplatesUpdate(updatedTemplates);

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



  const sidebarStyles: React.CSSProperties = isFullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }
    : {
        width: '319px',
        borderRight: '1px solid #e1e3e5',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
      };

  return (
    <div style={sidebarStyles}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Box width="100%">
          <Box padding={'200'} width="100%">
            <InlineStack align="space-between" blockAlign="center" gap={"200"}>
              <InlineStack gap={'200'}>
                {isFullScreen && onClose && (
                  <Button onClick={onClose} icon={ChevronLeftIcon} accessibilityLabel="Close editor" />
                )}
                <Text as="h3" variant="headingSm">SMS Settings</Text>
              </InlineStack>
              <InlineStack gap="200" blockAlign="center">
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
    </div>
  );
};
