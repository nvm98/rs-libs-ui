import { useState, useEffect } from 'react';
import { WhatsAppPreviewPanel } from './WhatsAppPreviewPanel';
import { WhatsAppTemplate, WhatsAppBlockType } from './types';
import { WhatsAppEditorSidebar } from './WhatsAppEditorSidebar';
import { useMediaQuery } from './hooks';
import { FloatingEditButton } from './FloatingEditButton';

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
  const [currentTemplate, setCurrentTemplate] = useState<WhatsAppTemplate | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<WhatsAppBlockType | null>(null);


  useEffect(() => {
    if (templates.length > 0 && !currentTemplate) {
      console.log('template', templates);
      const enTemplate = templates.find(template => template.locale === 'en');
      setCurrentTemplate(enTemplate || templates[0]);
    }
  }, [templates, currentTemplate]);

  const handleTemplateChange = (updatedTemplate: WhatsAppTemplate) => {
    setCurrentTemplate(updatedTemplate);
    if (onTemplatesUpdate) {
      onTemplatesUpdate([updatedTemplate]);
    }
  };

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
          template={currentTemplate}
          onTemplateChange={handleTemplateChange}
        />
        <WhatsAppPreviewPanel template={currentTemplate} onSave={onSave} />
      </div>
    );
  }

  // Mobile layout
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {/* Full-screen preview for mobile */}
      <WhatsAppPreviewPanel template={currentTemplate} onSave={onSave} />

      {/* Floating Edit Button */}
      <FloatingEditButton onClick={handleOpenEditor} />

      {/* Full-screen editor sidebar for mobile */}
      {isEditorOpen && (
        <WhatsAppEditorSidebar
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


