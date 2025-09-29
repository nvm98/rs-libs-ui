import { useCallback, useState, useEffect } from 'react';
import { EmailEditorSidebar } from './EmailEditorSidebar';
import { EmailPreviewPanel } from './EmailPreviewPanel';
import { Template } from './types';
import { VARIABLES } from './constants/variables.constant';
import { EmailBlock } from './interfaces/email-block.interface';
import { initialBlocks } from './constants/block.constant';
import { useBlockManager } from './hooks/useBlockManager';

interface EmailEditorLayoutProps {
  templates?: Template[] | undefined;
  onTemplatesUpdate?: (templates: Template[]) => void; // Callback cập nhật danh sách templates
}

export function EmailEditorLayout({
  templates = [],
  onTemplatesUpdate
}: EmailEditorLayoutProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [blocks, setBlocks] = useState<EmailBlock[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showVariables, setShowVariables] = useState<boolean>(false);

  // Find current template based on selected language
  useEffect(() => {
    const template = templates.find(t => t.locale === selectedLanguage);
    if (template) {
      setCurrentTemplate(template);
      setBlocks(template.blocks || initialBlocks);
    } else if (templates.length > 0) {
      // Fallback to first template if selected language not found
      setCurrentTemplate(templates[0]);
      setBlocks(templates[0].blocks || initialBlocks);
      setSelectedLanguage(templates[0].locale);
    }
  }, [templates, selectedLanguage]);

  // Use block manager for all block operations
  const {
    addBlock,
    removeBlock,
    updateBlock,
    moveBlock
  } = useBlockManager(blocks, (newBlocks: EmailBlock[]) => {
    setBlocks(newBlocks);
    // Update current template with new blocks
    if (currentTemplate) {
      const updatedTemplate = {
        ...currentTemplate,
        blocks: newBlocks
      };
      setCurrentTemplate(updatedTemplate);

      // Update templates array
      if (templates && onTemplatesUpdate) {
        const updatedTemplates = templates.map(template =>
          template.locale === currentTemplate.locale
            ? updatedTemplate
            : template
        );
        onTemplatesUpdate(updatedTemplates);
      }
    }
  });

  // Helper function to replace variables with example values
  const replaceVariables = useCallback((text: string) => {
    let result = text;
    VARIABLES.forEach(variable => {
      result = result.replace(new RegExp(variable.variable.replace(/[{}]/g, '\\$&'), 'g'), variable.example);
    });
    return result;
  }, []);

  // Handle language change
  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
    setSelectedBlockId(null); // Reset selection when changing language
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <EmailEditorSidebar
        templates={templates}
        onTemplatesUpdate={onTemplatesUpdate}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        blocks={blocks}
        selectedBlockId={selectedBlockId}
        onSelectedBlockChange={setSelectedBlockId}
        onAddBlock={addBlock}
        onRemoveBlock={removeBlock}
        onUpdateBlock={updateBlock}
        onMoveBlock={moveBlock}
        showVariables={showVariables}
        setShowVariables={setShowVariables}
      />
      <EmailPreviewPanel
        blocks={blocks}
        selectedBlockId={selectedBlockId}
        replaceVariables={replaceVariables}
      />
    </div>
  );
}
