import { useState, useEffect } from 'react';
import { Frame, Page } from '@shopify/polaris';
import { WhatsAppPreviewPanel } from './WhatsAppPreviewPanel';
import { WhatsAppTemplate } from './types';
import { WhatsAppTemplateForm } from './WhatsAppTemplateForm';

interface WhatsAppEditorLayoutProps {
  templates?: WhatsAppTemplate[] | undefined;
  onTemplatesUpdate?: (templates: WhatsAppTemplate[]) => void;
}

export function WhatsAppEditorLayout({
  templates = [],
  onTemplatesUpdate
}: WhatsAppEditorLayoutProps) {
  const [currentTemplate, setCurrentTemplate] = useState<WhatsAppTemplate | null>(null);

  // Initialize with the first template
  useEffect(() => {
    if (templates.length > 0 && !currentTemplate) {
      setCurrentTemplate(templates[0]);
    }
  }, [templates, currentTemplate]);

  const handleTemplateChange = (updatedTemplate: WhatsAppTemplate) => {
    setCurrentTemplate(updatedTemplate);
    if (onTemplatesUpdate) {
      // Assuming single template management for now
      onTemplatesUpdate([updatedTemplate]);
    }
  };

  if (!currentTemplate) {
    return null; // Or a loading/empty state
  }

  return (
    <Page fullWidth>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: 'calc(100vh - 56px)' }}>
        {/* Left Side: Form */}
        <div style={{ overflowY: 'auto', padding: '1.5rem' }}>
          <WhatsAppTemplateForm
            template={currentTemplate}
            onTemplateChange={handleTemplateChange}
          />
        </div>

        {/* Right Side: Preview */}
        <Frame>
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f6f6f7'
          }}>
            <WhatsAppPreviewPanel
              template={currentTemplate.template}
            />
          </div>
        </Frame>
      </div>
    </Page>
  );
}


