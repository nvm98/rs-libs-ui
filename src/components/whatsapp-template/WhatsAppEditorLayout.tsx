import { useState, useEffect } from 'react';
import { WhatsAppPreviewPanel } from './WhatsAppPreviewPanel';
import { WhatsAppTemplate } from './types';
import { WhatsAppEditorSidebar } from './WhatsAppEditorSidebar';

interface WhatsAppEditorLayoutProps {
  templates?: WhatsAppTemplate[] | undefined;
  onTemplatesUpdate?: (templates: WhatsAppTemplate[]) => void;
}

export function WhatsAppEditorLayout({
  templates = [],
  onTemplatesUpdate
}: WhatsAppEditorLayoutProps) {
  const [currentTemplate, setCurrentTemplate] = useState<WhatsAppTemplate | null>(null);


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

  if (!currentTemplate) {
    return null; // Or a loading/empty state
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <WhatsAppEditorSidebar
        template={currentTemplate}
        onTemplateChange={handleTemplateChange}
      />
      <WhatsAppPreviewPanel template={currentTemplate} />
    </div>
  );
}


