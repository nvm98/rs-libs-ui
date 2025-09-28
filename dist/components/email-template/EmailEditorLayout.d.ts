import { Template } from './types';
import { EmailBlock } from './interfaces/email-block.interface';
interface EmailEditorLayoutProps {
    templates?: Template[] | undefined;
    selectedBlockId: string | null;
    showVariables: boolean;
    onBlocksChange: (blocks: EmailBlock[]) => void;
    onSelectedBlockChange: (id: string | null) => void;
    setShowVariables: (show: boolean) => void;
    onTemplateChange?: (template: Template) => void;
    onTemplatesUpdate?: (templates: Template[]) => void;
}
export declare function EmailEditorLayout({ templates, selectedBlockId, showVariables, onBlocksChange, onSelectedBlockChange, setShowVariables, onTemplateChange, onTemplatesUpdate }: EmailEditorLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EmailEditorLayout.d.ts.map