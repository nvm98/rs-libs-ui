import { Template } from './types';
import { EmailBlock } from "./interfaces/email-block.interface";
interface EmailEditorSidebarProps {
    templates?: Template[];
    selectedBlockId: string | null;
    showVariables: boolean;
    onTemplateChange?: (template: Template) => void;
    onTemplatesUpdate?: (templates: Template[]) => void;
    onBlocksChange: (blocks: EmailBlock[]) => void;
    onSelectedBlockChange: (id: string | null) => void;
    setShowVariables: (show: boolean) => void;
}
export declare function EmailEditorSidebar({ templates, selectedBlockId, showVariables, onTemplateChange, onTemplatesUpdate, onBlocksChange, onSelectedBlockChange, setShowVariables }: EmailEditorSidebarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EmailEditorSidebar.d.ts.map