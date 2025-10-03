import { useState, useEffect, useCallback } from 'react';
import { WhatsAppPreviewPanel } from './WhatsAppPreviewPanel';
import { WhatsAppTemplate, WhatsAppBlockType } from './types';
import { WhatsAppEditorSidebar } from './WhatsAppEditorSidebar';
import { FloatingEditButton } from '../shared/components/FloatingEditButton';
import { useMediaQuery } from '../shared/hooks/useMediaQuery';
import { VARIABLES } from './constants/variables.constant';

interface WhatsAppEditorLayoutProps {
  templates?: WhatsAppTemplate[] | undefined;
  onTemplatesUpdate?: (templates: WhatsAppTemplate[]) => void;
  onSave?: () => void;
}

export function WhatsAppEditorLayout({
  templates = [],
  onTemplatesUpdate,
  onSave
}: WhatsAppEditorLayoutProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTemplate, setCurrentTemplate] = useState<WhatsAppTemplate | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<WhatsAppBlockType | null>(null);

  // Find current template based on selected language
  useEffect(() => {
    const template = templates.find(t => t.locale === selectedLanguage);
    if (template) {
      setCurrentTemplate(template);
    } else if (templates.length > 0) {
      // Fallback to first template if selected language not found
      setCurrentTemplate(templates[0]);
      setSelectedLanguage(templates[0].locale);
    }
  }, [templates, selectedLanguage]);

  const handleTemplateChange = (updatedTemplate: WhatsAppTemplate) => {
    setCurrentTemplate(updatedTemplate);

    // Update templates array
    if (templates && onTemplatesUpdate) {
      const updatedTemplates = templates.map(template =>
        template.locale === currentTemplate?.locale
          ? updatedTemplate
          : template
      );
      onTemplatesUpdate(updatedTemplates);
    }
  };

  // Handle language change
  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
    setSelectedBlockType(null);
  }, []);

  const replaceVariables = useCallback((text: string) => {
    return VARIABLES.reduce((acc, { variable, example }) => {
      const regex = new RegExp(variable.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      return acc.replace(regex, example);
    }, text);
  }, []);

  // Mobile handlers
  const handleOpenEditor = () => {
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
  };

  if (!currentTemplate) {
    return null; // Or a loading/empty state
  }

  // Desktop layout (unchanged)
  if (!isMobile) {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <WhatsAppEditorSidebar
          templates={templates}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          onTemplatesUpdate={onTemplatesUpdate}
          template={currentTemplate}
          onTemplateChange={handleTemplateChange}
        />
        <WhatsAppPreviewPanel template={currentTemplate} onSave={onSave} replaceVariables={replaceVariables} />
      </div>
    );
  }

  // Mobile layout
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {/* Full-screen preview for mobile */}
      <WhatsAppPreviewPanel template={currentTemplate} onSave={onSave} replaceVariables={replaceVariables} />

      {/* Floating Edit Button */}
      <FloatingEditButton onClick={handleOpenEditor} />

      {/* Full-screen editor sidebar for mobile */}
      {isEditorOpen && (
        <WhatsAppEditorSidebar
          templates={templates}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          onTemplatesUpdate={onTemplatesUpdate}
          template={currentTemplate}
          onTemplateChange={handleTemplateChange}
          isFullScreen={true}
          onClose={handleCloseEditor}
          selectedBlockType={selectedBlockType}
          onBlockTypeSelect={setSelectedBlockType}
        />
      )}
    </div>
  );
}


