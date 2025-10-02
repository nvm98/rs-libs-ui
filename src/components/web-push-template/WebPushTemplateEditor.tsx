import { useState, useEffect } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { WebPushEditorLayout } from './WebPushEditorLayout';
import { WebPushEditorEmptyState } from './WebPushEditorEmptyState';
import { WebPushEditorErrorState } from "./WebPushEditorErrorState";
import { WebPushTemplate } from "./types";
import { WebPushEditorSkeleton } from "./skeletons/WebPushEditorSkeleton";
import { useWebPushTemplateLoader } from "./hooks/useWebPushTemplateLoader";

interface WebPushTemplateEditorProps {
  isOpen: boolean;
  templateName?: string;
  onClose: () => void;
  onSave: (templates: WebPushTemplate[]) => void;
}

export function WebPushTemplateEditor({
  isOpen,
  templateName,
  onClose,
  onSave
}: WebPushTemplateEditorProps) {
  const templateLoader = useWebPushTemplateLoader();
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
  const [templates, setTemplates] = useState<WebPushTemplate[] | undefined>();

  const handleSave = () => {
    if (templates) {
      onSave(templates);
    }
  };



  // Update state when templates are loaded
  useEffect(() => {
    if (templateLoader.template) {
      setTemplates([templateLoader.template]);
    }
  }, [templateLoader.template]);

  // Update templates when changed from child components
  const onTemplatesUpdate = (newTemplates: WebPushTemplate[]) => {
    setTemplates(newTemplates);
  };

  // Determine modal content based on state
  const getModalContent = () => {
    if (templateLoader.loading && !templateLoader.template) {
      return <WebPushEditorSkeleton showPreview={true} />;
    }

    if (!templateLoader.loading && !templateLoader.error && !templateLoader.template && isTemplateLoaded) {
      return (
        <WebPushEditorEmptyState
          templateName={templateName}
          onCreateTemplate={handleCreateDefaultTemplate}
        />
      );
    }

    if (templateLoader.error) {
      return (
        <WebPushEditorErrorState
          error={templateLoader.error}
          onRetry={() => handleTryAgain(templateName || '')}
        />
      );
    }

    return (
      <WebPushEditorLayout
        templates={templates}
        onTemplatesUpdate={onTemplatesUpdate}
        onSave={handleSave}
      />
    );
  };

  const getModalTitle = () => {
    if (templateLoader.loading) {
      return "Loading template...";
    }
    if (!templateLoader.loading && !templateLoader.error && !templateLoader.template && isTemplateLoaded) {
      return "Create Webpush template";
    }
    if (templateLoader.error) {
      return "Error loading template";
    }
    return "Webpush template editor";
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
