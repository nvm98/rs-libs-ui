import { useState, useEffect } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { EmailEditorLayout } from './EmailEditorLayout';
import { EmailEditorEmptyState } from './EmailEditorEmptyState';
import { EmailBlock } from "./interfaces/email-block.interface";
import { initialBlocks } from "./constants/block.constant";
import { EmailEditorErrorState } from "./EmailEditorErrorState";
import { Template } from "./types";
import { EmailEditorSkeleton } from "./skeletons/EmailEditorSkeleton";
import { useTemplateLoader } from "./hooks/useTemplateLoader";

interface EmailTemplateEditorProps {
  isOpen: boolean;
  templateName?: string;
  initialBlocks?: EmailBlock[];
  autoLoadTemplate?: boolean;
  onClose: () => void;
  onSave: (blocks: EmailBlock[]) => void;
  onSettingsChange?: (settings: any) => void;
}

export function EmailTemplateEditor({
  isOpen,
  templateName,
  initialBlocks: propInitialBlocks,
  autoLoadTemplate = true,
  onClose,
  onSave,
  onSettingsChange
}: EmailTemplateEditorProps) {
  // Template loader
  const templateLoader = useTemplateLoader();
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);
  const [blocks, setBlocks] = useState<EmailBlock[]>(propInitialBlocks || initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showVariables, setShowVariables] = useState<boolean>(false);

  // Load template when modal opens
  useEffect(() => {
    if (isOpen && templateName && !isTemplateLoaded && autoLoadTemplate) {
      templateLoader.loadTemplate(templateName);
      setIsTemplateLoaded(true);
    }
  }, [isOpen, templateName, isTemplateLoaded, templateLoader, autoLoadTemplate]);

  // Update blocks when template blocks are loaded
  useEffect(() => {
    if (templateLoader.template) {
      setBlocks(templateLoader.template.blocks);
    }
  }, [templateLoader.template]);

  // Update blocks when prop initialBlocks change
  useEffect(() => {
    if (propInitialBlocks) {
      setBlocks(propInitialBlocks);
    }
  }, [propInitialBlocks]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsTemplateLoaded(false);
      templateLoader.clearTemplate();
      setSelectedBlockId(null);
      setShowVariables(false);
    }
  }, [isOpen, templateLoader]);

  // Handle creating default template
  const handleCreateDefaultTemplate = () => {
    setBlocks(propInitialBlocks || initialBlocks);
  };

  const handleTryAgain = (templateName: string) => {
    templateLoader.loadTemplate(templateName);
  };

  // Handle save
  const handleSave = () => {
    if (templateLoader.template && templateLoader.template.id) {
      templateLoader.template.blocks = blocks;
      templateLoader.saveTemplate(templateLoader.template);
    }
    onSave(blocks);
  };

  // Handle blocks change
  const handleBlocksChange = (newBlocks: EmailBlock[]) => {
    setBlocks(newBlocks);
    // Notify parent of settings changes if callback provided
    if (onSettingsChange) {
      onSettingsChange({ blocks: newBlocks });
    }
  };

  // Select template
  const onTemplateChange = (template: any) => {
    templateLoader.selectTemplate(template);
    console.log('Template changed:', template);
  };

  // Add or remove template when choose language
  const onTemplatesUpdate = (newTemplates: Template[]) => {
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
        templates={templateLoader.templates}
        onBlocksChange={handleBlocksChange}
        selectedBlockId={selectedBlockId}
        onSelectedBlockChange={setSelectedBlockId}
        showVariables={showVariables}
        setShowVariables={setShowVariables}
        onTemplateChange={onTemplateChange}
        onTemplatesUpdate={onTemplatesUpdate}
      />
    );
  };

  // Determine modal title based on state
  const getModalTitle = () => {
    if (templateLoader.loading) {
      return "Loading Template...";
    }
    if (!templateLoader.loading && !templateLoader.error && !templateLoader.template && isTemplateLoaded) {
      return "Create Email Template";
    }
    if (templateLoader.error) {
      return "Error Loading Template";
    }
    return "Email Template Builder";
  };

  // Determine title bar actions based on state
  const getTitleBarActions = () => {
    if (!templateLoader.loading && !templateLoader.error &&
        !(!templateLoader.template && isTemplateLoaded)) {
      return {
        primaryAction: {
          content: 'Save',
          onAction: handleSave,
        }
      };
    }

    return {};
  };

  const titleBarActions = getTitleBarActions();

  return (
    <Modal
      open={isOpen}
      variant="max"
      onHide={onClose}
    >
      <TitleBar title={getModalTitle()}>
        {titleBarActions.primaryAction && (
          <button variant="primary" onClick={titleBarActions.primaryAction.onAction}>
            {titleBarActions.primaryAction.content}
          </button>
        )}
      </TitleBar>
      {getModalContent()}
    </Modal>
  );
}

export default EmailTemplateEditor;
