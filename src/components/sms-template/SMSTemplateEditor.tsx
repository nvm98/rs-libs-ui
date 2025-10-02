import { useState, useEffect } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { SMSEditorLayout } from './SMSEditorLayout';
import { SMSEditorEmptyState } from './SMSEditorEmptyState';
import { SMSEditorErrorState } from "./SMSEditorErrorState";
import { SMSTemplate } from "./types";
import { SMSEditorSkeleton } from "./SMSEditorSkeleton";
import { useSMSTemplateLoader } from "./hooks/useSMSTemplateLoader";

interface SMSTemplateEditorProps {
  isOpen: boolean;
  templateName?: string;
  onClose: () => void;
  onSave: (templates: SMSTemplate[]) => void;
}

export function SMSTemplateEditor({
  isOpen,
  templateName,
  onClose,
  onSave
}: SMSTemplateEditorProps) {
  const templateLoader = useSMSTemplateLoader();
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
  const [templates, setTemplates] = useState<SMSTemplate[] | undefined>();

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
  const onTemplatesUpdate = (newTemplates: SMSTemplate[]) => {
    setTemplates(newTemplates);
  };

  // Determine modal content based on state
  const getModalContent = () => {
    if (templateLoader.loading && !templateLoader.template) {
      return <SMSEditorSkeleton />;
    }

    if (!templateLoader.loading && !templateLoader.error && !templateLoader.template && isTemplateLoaded) {
      return (
        <SMSEditorEmptyState
          templateName={templateName}
          onCreateTemplate={handleCreateDefaultTemplate}
        />
      );
    }

    if (templateLoader.error) {
      return (
        <SMSEditorErrorState
          error={templateLoader.error}
          onRetry={() => handleTryAgain(templateName || '')}
        />
      );
    }

    return (
      <SMSEditorLayout
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
      return "Create SMS template";
    }
    if (templateLoader.error) {
      return "Error loading template";
    }
    return "SMS template editor";
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