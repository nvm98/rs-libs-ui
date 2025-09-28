import { Box, Text, Select, Button, InlineStack } from "@shopify/polaris";
import { BlockList } from './BlockList';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Template } from './types';
import { VariablePanel } from "./VariablePanel";
import { EmailBlock } from "./interfaces/email-block.interface";
import { initialBlocks } from "./constants/block.constant";
import { AVAILABLE_LANGUAGES } from "./constants/languages";
import { useBlockManager } from "./hooks/useBlockManager";

interface EmailEditorSidebarProps {
  templates?: Template[];
  selectedBlockId: string | null;
  showVariables: boolean;
  onTemplateChange?: (template: Template) => void;
  onTemplatesUpdate?: (templates: Template[]) => void; // Callback để cập nhật danh sách templates
  onBlocksChange: (blocks: EmailBlock[]) => void;
  onSelectedBlockChange: (id: string | null) => void;
  setShowVariables: (show: boolean) => void;
}

export function EmailEditorSidebar({
  templates = [],
  selectedBlockId,
  showVariables,
  onTemplateChange,
  onTemplatesUpdate,
  onBlocksChange,
  onSelectedBlockChange,
  setShowVariables
}: EmailEditorSidebarProps) {

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  // Tìm template hiện tại dựa trên ngôn ngữ được chọn
  const currentTemplate = useMemo(() => {
    return templates.find(template => template.locale === selectedLanguage);
  }, [templates, selectedLanguage]);

  const {
    addBlock,
    removeBlock,
    updateBlock,
    moveBlock
  } = useBlockManager(currentTemplate?.blocks, onBlocksChange);

  
  const [showAddLanguageForm, setShowAddLanguageForm] = useState(false);
  const [selectedNewLanguage, setSelectedNewLanguage] = useState('');

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

  // Effect để cập nhật blocks khi thay đổi template hoặc ngôn ngữ
  useEffect(() => {
    onSelectedBlockChange(null);
    if (currentTemplate) {
      if (onTemplateChange) {
        onTemplateChange(currentTemplate);
      }
      if (currentTemplate.blocks && Array.isArray(currentTemplate.blocks) && currentTemplate.blocks.length > 0) {
        onBlocksChange(currentTemplate.blocks);
      } else {
        onBlocksChange(initialBlocks);
      }
    } else {
      onBlocksChange(initialBlocks);
    }
  }, [currentTemplate, onTemplateChange, onBlocksChange, selectedLanguage, onSelectedBlockChange]);

  // Lấy danh sách ngôn ngữ chưa có template
  const getAvailableLanguagesForSelection = useCallback(() => {
    const existingLanguageCodes = availableLanguages.map(lang => lang.value);
    return AVAILABLE_LANGUAGES.filter(lang => !existingLanguageCodes.includes(lang.value));
  }, [availableLanguages]);

  const handleLanguageChange = useCallback((value: string) => {
    setSelectedLanguage(value);
  }, []);

  const handleAddLanguage = useCallback(() => {
    if (selectedNewLanguage) {
      const languageToAdd = AVAILABLE_LANGUAGES.find(lang => lang.value === selectedNewLanguage);
      if (languageToAdd) {
        const englishTemplate = templates.find(template => template.locale === 'en');
        const newTemplate: Template = {
          name: `Template ${languageToAdd.label}`,
          content: englishTemplate?.content || '',
          locale: languageToAdd.value,
          type: 'email',
          engine: 'liquid',
          is_active: true,
          blocks: englishTemplate?.blocks ? [...englishTemplate.blocks] : undefined
        };
        const updatedTemplates = [...templates, newTemplate];

        // Cập nhật templates ngay lập tức để availableLanguages được tính toán lại
        if (onTemplatesUpdate) {
          onTemplatesUpdate(updatedTemplates);
        }

        // Chuyển sang ngôn ngữ vừa thêm
        setSelectedLanguage(languageToAdd.value);
        setSelectedNewLanguage('');
        setShowAddLanguageForm(false);

        // Gọi callback template change với template mới
        if (onTemplateChange) {
          onTemplateChange(newTemplate);
        }
      }
    }
  }, [selectedNewLanguage, templates, onTemplateChange, onTemplatesUpdate]);

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

  return (
    <div style={{
      width: '320px',
      borderRight: '1px solid #e1e3e5',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      position: 'relative'
    }}>
      {/* Template Structure Section */}
      <div style={{
        flex: 1,
        paddingBottom: '60px',
        overflowY: 'auto'
      }}>
        <Box padding={'400'} width="100%">
          <Box width="100%">
            <InlineStack align="space-between" blockAlign="center" gap={"200"}>
              <Text as="h3" variant="headingSm">Settings</Text>
              {/* Language selector với khả năng thêm ngôn ngữ mới */}
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
        </Box>
        <BlockList
          blocks={currentTemplate?.blocks}
          selectedBlockId={selectedBlockId}
          onSelectedBlockChange={onSelectedBlockChange}
          onAddBlock={addBlock}
          onRemoveBlock={removeBlock}
          onUpdateBlock={updateBlock}
          onMoveBlock={moveBlock}
        />
      </div>

      {/* Variable Suggestions Panel - Fixed at bottom */}
      <VariablePanel
        showVariables={showVariables}
        setShowVariables={setShowVariables}
      />
    </div>
  );
}
