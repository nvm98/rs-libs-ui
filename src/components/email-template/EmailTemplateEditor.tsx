import { useState, useEffect } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { EmailEditorLayout } from './EmailEditorLayout';
import { EmailEditorEmptyState } from './EmailEditorEmptyState';
import { initialBlocks } from "./constants/block.constant";
import { EmailEditorErrorState } from "./EmailEditorErrorState";
import { Template } from "./types";
import { EmailEditorSkeleton } from "./skeletons/EmailEditorSkeleton";
import { useTemplateLoader } from "./hooks/useTemplateLoader";

interface EmailTemplateEditorProps {
  isOpen: boolean;
  templateName?: string;
  onClose: () => void;
  onSave: (templates: Template[]) => void;
}

export function EmailTemplateEditor({
  isOpen,
  templateName,
  onClose,
  onSave
}: EmailTemplateEditorProps) {
  const templateLoader = useTemplateLoader();
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
  const [templates, setTemplates] = useState<Template[] | undefined>();

  // Update state when templates are loaded
  useEffect(() => {
    if (templateLoader.templates) {
      setTemplates(templateLoader.templates);
    }
  }, [templateLoader.templates]);

  // Handle save
  const handleSave = () => {
    if (templates) {
      templateLoader.saveAllTemplates(templates);
      onSave(templates);
    }
  };

  // Update templates when changed from child components
  const onTemplatesUpdate = (newTemplates: Template[]) => {
    setTemplates(newTemplates);
    templateLoader.updateTemplates(newTemplates);
  };

  // Determine modal content based on state
  const getModalContent = () => {
    if (templateLoader.loading && !templateLoader.template) {
      return <EmailEditorSkeleton showPreview={true} />;
    }

    if (!templateLoader.loading && !templateLoader.error && !templateLoader.template && isTemplateLoaded) {
      return (
        <EmailEditorEmptyState
          templateName={templateName}
          onCreateTemplate={handleCreateDefaultTemplate}
        />
      );
    }

    if (templateLoader.error) {
      return (
        <EmailEditorErrorState 
          templateName={templateName || ''}
          handleTryAgain={handleTryAgain}
        />
      );
    }

    return (
      <EmailEditorLayout
        templates={templates}
        onTemplatesUpdate={onTemplatesUpdate}
        onSave={handleSave}
        showSaveButton={true}
      />
    );
  };

  // Determine modal title based on state
  const getModalTitle = () => {
    if (templateLoader.loading) {
      return "Loading template...";
    }
    if (!templateLoader.loading && !templateLoader.error && !templateLoader.template && isTemplateLoaded) {
      return "Create email template";
    }
    if (templateLoader.error) {
      return "Error loading template";
    }
    return "Email template editor";
  };

  // Title bar actions are no longer needed since save button is in preview panel

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

export default EmailTemplateEditor;
