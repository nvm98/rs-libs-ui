import { useState, useEffect } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { WhatsAppEditorLayout } from './WhatsAppEditorLayout';
import { WhatsAppEditorEmptyState } from './WhatsAppEditorEmptyState';
import { WhatsAppEditorErrorState } from "./WhatsAppEditorErrorState";
import { WhatsAppTemplate } from "./types";
import { WhatsAppEditorSkeleton } from "./skeletons/WhatsAppEditorSkeleton";
import { useWhatsAppTemplateLoader } from "./hooks/useWhatsAppTemplateLoader";

interface WhatsAppTemplateEditorProps {
  isOpen: boolean;
  templateName?: string;
  onClose: () => void;
  onSave: (templates: WhatsAppTemplate[]) => void;
}

export function WhatsAppTemplateEditor({
  isOpen,
  templateName,
  onClose,
  onSave
}: WhatsAppTemplateEditorProps) {
  const templateLoader = useWhatsAppTemplateLoader();
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);

  // Load template when modal opens
  useEffect(() => {
    if (isOpen && templateName && !isTemplateLoaded) {
      templateLoader.loadTemplate(templateName);
      setIsTemplateLoaded(true);
    }
  }, [isOpen, templateName, isTemplateLoaded, templateLoader]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsTemplateLoaded(false);
      templateLoader.clearTemplate();
    }
  }, [isOpen, templateLoader]);

  // Handle creating default template
  const handleCreateDefaultTemplate = () => {
    if (templateName) {
      templateLoader.createDefaultTemplate(templateName);
    }
  };

  const handleTryAgain = (templateName: string) => {
    templateLoader.loadTemplate(templateName);
  };

  // State for templates
  const [templates, setTemplates] = useState<WhatsAppTemplate[] | undefined>();

  // Update state when templates are loaded
  useEffect(() => {
    if (templateLoader.template) {
      setTemplates([templateLoader.template]);
    }
  }, [templateLoader.template]);

  // Handle save
  const handleSave = () => {
    if (templates) {
      onSave(templates);
    }
  };

  // Update templates when changed from child components
  const onTemplatesUpdate = (newTemplates: WhatsAppTemplate[]) => {
    setTemplates(newTemplates);
  };

  // Determine modal content based on state
  const getModalContent = () => {
    if (templateLoader.loading && !templateLoader.template) {
      return <WhatsAppEditorSkeleton showPreview={true} />;
    }

    if (!templateLoader.loading && !templateLoader.error && !templateLoader.template && isTemplateLoaded) {
      return (
        <WhatsAppEditorEmptyState
          templateName={templateName}
          onCreateTemplate={handleCreateDefaultTemplate}
        />
      );
    }

    if (templateLoader.error) {
      return (
        <WhatsAppEditorErrorState
          error={templateLoader.error}
          onRetry={() => handleTryAgain(templateName || '')}
        />
      );
    }

    return (
      <WhatsAppEditorLayout
        templates={templates}
        onTemplatesUpdate={onTemplatesUpdate}
        onSave={handleSave}
      />
    );
  };

  // Determine modal title based on state
  const getModalTitle = () => {
    if (templateLoader.loading) {
      return "Loading template...";
    }
    if (!templateLoader.loading && !templateLoader.error && !templateLoader.template && isTemplateLoaded) {
      return "Create WhatsApp template";
    }
    if (templateLoader.error) {
      return "Error loading template";
    }
    return "WhatsApp template editor";
  };



  return (
    <Modal
      open={isOpen}
      variant="max"
      onHide={onClose}
    >
      <TitleBar title={getModalTitle()} />
      {getModalContent()}
    </Modal>
  );
}
