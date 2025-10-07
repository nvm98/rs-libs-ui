import { useState, useEffect } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { EmailEditorLayout } from './EmailEditorLayout';
import { EmailEditorEmptyState } from './EmailEditorEmptyState';

import { EmailEditorErrorState } from "./EmailEditorErrorState";
import { Template } from "./types";
import { EmailEditorSkeleton } from "./skeletons/EmailEditorSkeleton";
import { useEmailTemplateLoader, useEmailTemplateAction } from "./hooks";

interface EmailTemplateEditorProps {
  isOpen: boolean;
  templateName: string;
  onClose: () => void;
  onSave: (templates: Template[]) => void;
}

export function EmailTemplateEditor({
  isOpen,
  templateName,
  onClose,
  onSave
}: EmailTemplateEditorProps) {
  const templateLoader = useEmailTemplateLoader();
  const templateAction = useEmailTemplateAction();
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
      templateAction.saveAllTemplates(
        templates,
        () => {
          // On success, call the parent onSave and close the modal
          onSave(templates);
          onClose();
        },
        (error) => {
          // On error, the error state is handled by the hook and displayed in the UI
          console.error("Failed to save templates:", error);
        }
      );
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
        templateName={templateName}
        templates={templates}
        onTemplatesUpdate={onTemplatesUpdate}
        onSave={handleSave}
        showSaveButton={true}
        loading={templateAction.loading}
        error={templateAction.error}
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
