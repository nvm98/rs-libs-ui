import { useCallback, useState } from 'react';
import { EmailEditorSidebar } from './EmailEditorSidebar';
import { EmailPreviewPanel } from './EmailPreviewPanel';
import { Template } from './types';
import { VARIABLES } from './constants/variables.constant';
import { EmailBlock } from './interfaces/email-block.interface';

interface EmailEditorLayoutProps {
  templates?: Template[] | undefined;
  selectedBlockId: string | null;
  showVariables: boolean;
  onBlocksChange: (blocks: EmailBlock[]) => void;
  onSelectedBlockChange: (id: string | null) => void;
  setShowVariables: (show: boolean) => void;
  onTemplateChange?: (template: Template) => void; // Callback khi thay đổi template
  onTemplatesUpdate?: (templates: Template[]) => void; // Callback cập nhật danh sách templates
}

export function EmailEditorLayout({
  templates = [],
  selectedBlockId,
  showVariables,
  onBlocksChange,
  onSelectedBlockChange,
  setShowVariables,
  onTemplateChange,
  onTemplatesUpdate
}: EmailEditorLayoutProps) {
  // State để theo dõi template hiện tại
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(templates[0]);

  // Helper function to replace variables with example values
  const replaceVariables = useCallback((text: string) => {
    let result = text;
    VARIABLES.forEach(variable => {
      result = result.replace(new RegExp(variable.variable.replace(/[{}]/g, '\\$&'), 'g'), variable.example);
    });
    return result;
  }, []);

  // Callback để xử lý khi template thay đổi từ sidebar
  const handleTemplateChange = useCallback((template: Template) => {
    setCurrentTemplate(template);
    if (onTemplateChange) {
      onTemplateChange(template);
    }
  }, [onTemplateChange]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <EmailEditorSidebar
        templates={templates}
        onTemplateChange={handleTemplateChange}
        onTemplatesUpdate={onTemplatesUpdate}
        onBlocksChange={onBlocksChange}
        selectedBlockId={selectedBlockId}
        onSelectedBlockChange={onSelectedBlockChange}
        showVariables={showVariables}
        setShowVariables={setShowVariables}
      />
      <EmailPreviewPanel
        blocks={currentTemplate?.blocks}
        selectedBlockId={selectedBlockId}
        replaceVariables={replaceVariables}
      />
    </div>
  );
}
