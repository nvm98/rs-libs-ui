import { EmailBlock } from "./interfaces/email-block.interface";
interface EmailTemplateEditorProps {
    isOpen: boolean;
    templateName?: string;
    initialBlocks?: EmailBlock[];
    autoLoadTemplate?: boolean;
    onClose: () => void;
    onSave: (blocks: EmailBlock[]) => void;
    onSettingsChange?: (settings: any) => void;
}
export declare function EmailTemplateEditor({ isOpen, templateName, initialBlocks: propInitialBlocks, autoLoadTemplate, onClose, onSave, onSettingsChange }: EmailTemplateEditorProps): import("react/jsx-runtime").JSX.Element;
export default EmailTemplateEditor;
//# sourceMappingURL=EmailTemplateEditor.d.ts.map