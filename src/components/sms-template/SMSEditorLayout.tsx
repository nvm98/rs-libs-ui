import { useState, useEffect, useCallback } from 'react';
import { SMSTemplate } from './types';
import { SMSPreviewPanel } from './SMSPreviewPanel';
import { SMSEditorSidebar } from './SMSEditorSidebar';
import { FloatingEditButton } from '../shared/components/FloatingEditButton';
import { useMediaQuery } from '../shared/hooks/useMediaQuery';

interface SMSEditorLayoutProps {
  templates?: SMSTemplate[] | undefined;
  onTemplatesUpdate?: (templates: SMSTemplate[]) => void;
  onSave?: () => void;
}

export function SMSEditorLayout({
  templates = [],
  onTemplatesUpdate,
  onSave
}: SMSEditorLayoutProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTemplate, setCurrentTemplate] = useState<SMSTemplate | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const template = templates.find(t => t.locale === selectedLanguage);
    if (template) {
      setCurrentTemplate(template);
    } else if (templates.length > 0) {
      setCurrentTemplate(templates[0]);
      setSelectedLanguage(templates[0].locale);
    }
  }, [templates, selectedLanguage]);

  const handleTemplateChange = (updatedTemplate: SMSTemplate) => {
    setCurrentTemplate(updatedTemplate);
    if (onTemplatesUpdate) {
      const updatedTemplates = templates.map(t => t.locale === updatedTemplate.locale ? updatedTemplate : t);
      onTemplatesUpdate(updatedTemplates);
    }
  };

  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
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

  // Desktop layout
  if (!isMobile) {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <SMSEditorSidebar
          templates={templates}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          onTemplatesUpdate={onTemplatesUpdate}
          template={currentTemplate}
          onTemplateChange={handleTemplateChange}
        />
        <SMSPreviewPanel template={currentTemplate} onSave={onSave} />
      </div>
    );
  }

  // Mobile layout
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <SMSPreviewPanel template={currentTemplate} onSave={onSave} />
      <FloatingEditButton onClick={handleOpenEditor} />
      {isEditorOpen && (
        <SMSEditorSidebar
          templates={templates}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          onTemplatesUpdate={onTemplatesUpdate}
          template={currentTemplate}
          onTemplateChange={handleTemplateChange}
          isFullScreen={true}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
}
