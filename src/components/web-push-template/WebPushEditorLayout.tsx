import { useState, useEffect, useCallback } from 'react';
import { WebPushPreviewPanel } from './WebPushPreviewPanel';
import { WebPushTemplate, WebPushBlockType } from './types';
import { WebPushEditorSidebar } from './WebPushEditorSidebar';
import { FloatingEditButton } from '../shared/components/FloatingEditButton';
import { useMediaQuery } from '../shared/hooks/useMediaQuery';

interface WebPushEditorLayoutProps {
  templates?: WebPushTemplate[] | undefined;
  onTemplatesUpdate?: (templates: WebPushTemplate[]) => void;
  onSave?: () => void;
}

export function WebPushEditorLayout({
  templates = [],
  onTemplatesUpdate,
  onSave
}: WebPushEditorLayoutProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTemplate, setCurrentTemplate] = useState<WebPushTemplate | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<WebPushBlockType | null>(null);

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

  const handleTemplateChange = (updatedTemplate: WebPushTemplate) => {
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
    setSelectedBlockType(null); // Reset selection when changing language
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
        <WebPushEditorSidebar
          templates={templates}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          onTemplatesUpdate={onTemplatesUpdate}
          template={currentTemplate}
          onTemplateChange={handleTemplateChange}
          selectedBlockType={selectedBlockType}
          onBlockTypeSelect={setSelectedBlockType}
        />
        <WebPushPreviewPanel template={currentTemplate} onSave={onSave} />
      </div>
    );
  }

  // Mobile layout
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {/* Full-screen preview for mobile */}
      <WebPushPreviewPanel template={currentTemplate} onSave={onSave} />

      {/* Floating Edit Button */}
      <FloatingEditButton onClick={handleOpenEditor} />

      {/* Full-screen editor sidebar for mobile */}
      {isEditorOpen && (
        <WebPushEditorSidebar
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
