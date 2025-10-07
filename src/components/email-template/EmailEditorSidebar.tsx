import { Box, Text, Select, Button, InlineStack } from "@shopify/polaris";
import { ChevronLeftIcon } from "@shopify/polaris-icons";
import { BlockList } from './BlockList';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { VariablePanel } from "../shared/components/VariablePanel";
import { EmailBlock } from "./interfaces/email-block.interface";
import { AVAILABLE_LANGUAGES } from "./constants/languages";
import { VARIABLES } from "./constants/variables.constant";
import { Template } from "../shared/types/template.type";

interface EmailEditorSidebarProps {
  templateName: string,
  templates?: Template[];
  selectedLanguage: string;
  blocks: EmailBlock[];
  selectedBlockId: string | null;
  showVariables: boolean;
  onTemplatesUpdate?: (templates: Template[]) => void;
  onLanguageChange: (language: string) => void;
  onSelectedBlockChange: (id: string | null) => void;
  onAddBlock: (type: any, index?: number) => void;
  onRemoveBlock: (id: string) => void;
  onUpdateBlock: (id: string, updates: Partial<EmailBlock>) => void;
  onMoveBlock: (fromIndex: number, toIndex: number) => void;
  setShowVariables: (show: boolean) => void;
  isMobile?: boolean;
  onCloseSidebar?: () => void;
}

export function EmailEditorSidebar({
  templateName,
  templates = [],
  selectedLanguage,
  blocks,
  selectedBlockId,
  showVariables,
  onTemplatesUpdate,
  onLanguageChange,
  onSelectedBlockChange,
  onAddBlock,
  onRemoveBlock,
  onUpdateBlock,
  onMoveBlock,
  setShowVariables,
  isMobile = false,
  onCloseSidebar
}: EmailEditorSidebarProps) {
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

  // Reset selection when language changes
  useEffect(() => {
    onSelectedBlockChange(null);
  }, [selectedLanguage, onSelectedBlockChange]);

  // Lấy danh sách ngôn ngữ chưa có template
  const getAvailableLanguagesForSelection = useCallback(() => {
    const existingLanguageCodes = availableLanguages.map(lang => lang.value);
    return AVAILABLE_LANGUAGES.filter(lang => !existingLanguageCodes.includes(lang.value));
  }, [availableLanguages]);

  const handleLanguageChange = useCallback((value: string) => {
    onLanguageChange(value);
  }, [onLanguageChange]);

  const handleAddLanguage = useCallback(() => {
    if (selectedNewLanguage) {
      const languageToAdd = AVAILABLE_LANGUAGES.find(lang => lang.value === selectedNewLanguage);
      if (languageToAdd) {
        const englishTemplate = templates.find(template => template.locale === 'en');
        const newTemplate: Template = {
          type: templateName,
          content: englishTemplate?.content || '',
          locale: languageToAdd.value,
          channel: 'email',
          engine: 'handlebars',
          isActive: true,
          blocks: englishTemplate?.blocks ? [...englishTemplate.blocks] : []
        };
        const updatedTemplates = [...templates, newTemplate];

        // Cập nhật templates ngay lập tức để availableLanguages được tính toán lại
        if (onTemplatesUpdate) {
          onTemplatesUpdate(updatedTemplates);
        }

        // Chuyển sang ngôn ngữ vừa thêm
        onLanguageChange(languageToAdd.value);
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

  return (
    <div style={{
      width: isMobile ? '100vw' : '319px',
      minWidth: isMobile ? '100vw' : '319px',
      maxWidth: isMobile ? '100vw' : '319px',
      height: isMobile ? '100vh' : 'auto',
      borderRight: isMobile ? 'none' : '1px solid #e1e3e5',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      position: isMobile ? 'fixed' : 'relative',
      top: isMobile ? 0 : 'auto',
      left: isMobile ? 0 : 'auto',
      zIndex: isMobile ? 1000 : 'auto'
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
              <InlineStack gap={'200'}>
                {isMobile && onCloseSidebar && (
                  <Button
                    variant="tertiary"
                    icon={ChevronLeftIcon}
                    onClick={onCloseSidebar}
                    accessibilityLabel="Close sidebar"
                  />
                )}
                <Text as="h3" variant="headingSm">Settings</Text>
              </InlineStack>
              <InlineStack gap="200" align="center">
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
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectedBlockChange={onSelectedBlockChange}
          onAddBlock={onAddBlock}
          onRemoveBlock={onRemoveBlock}
          onUpdateBlock={onUpdateBlock}
          onMoveBlock={onMoveBlock}
        />
      </div>

      {/* Variable Suggestions Panel - Fixed at bottom */}
      <VariablePanel
        variables={VARIABLES}
        showVariables={showVariables}
        setShowVariables={setShowVariables}
      />
    </div>
  );
}
