import * as react_jsx_runtime from 'react/jsx-runtime';

type EmailBlockType = 'header' | 'text' | 'image' | 'button' | 'product' | 'divider' | 'spacer' | 'footer';

interface EmailBlock {
    id: string;
    type: EmailBlockType;
    content: any;
    styles: any;
}

interface EmailTemplateEditorProps {
    isOpen: boolean;
    templateName?: string;
    initialBlocks?: EmailBlock[];
    autoLoadTemplate?: boolean;
    onClose: () => void;
    onSave: (blocks: EmailBlock[]) => void;
    onSettingsChange?: (settings: any) => void;
}
declare function EmailTemplateEditor({ isOpen, templateName, initialBlocks: propInitialBlocks, autoLoadTemplate, onClose, onSave, onSettingsChange }: EmailTemplateEditorProps): react_jsx_runtime.JSX.Element;

interface EmailBlockRendererProps {
    blocks: EmailBlock[];
    replaceVariables: (text: string) => string;
    selectedBlockId?: string | null;
}
declare function EmailBlockRenderer({ blocks, replaceVariables, selectedBlockId }: EmailBlockRendererProps): react_jsx_runtime.JSX.Element;

interface EmailBlockSettingsProps {
    block: EmailBlock;
    onUpdate: (updates: Partial<EmailBlock>) => void;
}
declare function EmailBlockSettings({ block, onUpdate }: EmailBlockSettingsProps): react_jsx_runtime.JSX.Element | null;

interface Template {
    id?: string;
    shop?: string;
    name: string;
    content: string;
    blocks?: any;
    locale: string;
    type: 'email';
    engine: 'liquid' | 'handlebars' | 'mustache';
    subject?: string;
    description?: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

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
declare function EmailEditorLayout({ templates, selectedBlockId, showVariables, onBlocksChange, onSelectedBlockChange, setShowVariables, onTemplateChange, onTemplatesUpdate }: EmailEditorLayoutProps): react_jsx_runtime.JSX.Element;

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
declare function EmailEditorSidebar({ templates, selectedBlockId, showVariables, onTemplateChange, onTemplatesUpdate, onBlocksChange, onSelectedBlockChange, setShowVariables }: EmailEditorSidebarProps): react_jsx_runtime.JSX.Element;

interface EmailPreviewPanelProps {
    blocks: EmailBlock[];
    selectedBlockId: string | null;
    replaceVariables: (text: string) => string;
}
declare function EmailPreviewPanel({ blocks, selectedBlockId, replaceVariables }: EmailPreviewPanelProps): react_jsx_runtime.JSX.Element;

interface EmailEditorEmptyStateProps {
    onCreateTemplate: () => void;
    templateName?: string;
}
declare function EmailEditorEmptyState({ onCreateTemplate, templateName }: EmailEditorEmptyStateProps): react_jsx_runtime.JSX.Element;

interface EmailEditorErrorStateProps {
    handleTryAgain: (templateName: string) => void;
    templateName: string;
}
declare function EmailEditorErrorState({ handleTryAgain, templateName }: EmailEditorErrorStateProps): react_jsx_runtime.JSX.Element;

interface BlockListProps {
    blocks: EmailBlock[];
    selectedBlockId: string | null;
    onSelectedBlockChange: (id: string | null) => void;
    onAddBlock: (type: EmailBlockType, index?: number) => void;
    onRemoveBlock: (id: string) => void;
    onUpdateBlock: (id: string, updates: Partial<EmailBlock>) => void;
    onMoveBlock: (fromIndex: number, toIndex: number) => void;
}
declare function BlockList({ blocks, selectedBlockId, onSelectedBlockChange, onAddBlock, onRemoveBlock, onUpdateBlock, onMoveBlock }: BlockListProps): react_jsx_runtime.JSX.Element;

interface VariablePanelProps {
    showVariables: boolean;
    setShowVariables: (show: boolean) => void;
}
declare function VariablePanel({ showVariables, setShowVariables }: VariablePanelProps): react_jsx_runtime.JSX.Element;

interface Language {
    value: string;
    label: string;
}

interface ContentUpdateFunction {
    (updates: any): void;
}
interface StyleUpdateFunction {
    (updates: any): void;
}
interface BlockSettingsComponentProps {
    block: EmailBlock;
    updateContent: ContentUpdateFunction;
    updateStyles: StyleUpdateFunction;
}
interface BlockSettingsStyleOnlyProps {
    block: EmailBlock;
    updateStyles: StyleUpdateFunction;
}

declare function HeaderBlockSettings({ block, updateContent, updateStyles }: BlockSettingsComponentProps): react_jsx_runtime.JSX.Element;

declare function TextBlockSettings({ block, updateContent, updateStyles }: BlockSettingsComponentProps): react_jsx_runtime.JSX.Element;

declare function ImageBlockSettings({ block, updateContent, updateStyles }: BlockSettingsComponentProps): react_jsx_runtime.JSX.Element;

declare function ButtonBlockSettings({ block, updateContent, updateStyles }: BlockSettingsComponentProps): react_jsx_runtime.JSX.Element;

declare function ProductBlockSettings({ block, updateContent, updateStyles }: BlockSettingsComponentProps): react_jsx_runtime.JSX.Element;

declare function DividerBlockSettings({ block, updateStyles }: BlockSettingsStyleOnlyProps): react_jsx_runtime.JSX.Element;

declare function SpacerBlockSettings({ block, updateStyles }: BlockSettingsStyleOnlyProps): react_jsx_runtime.JSX.Element;

declare function FooterBlockSettings({ block, updateContent, updateStyles }: BlockSettingsComponentProps): react_jsx_runtime.JSX.Element;

interface BlockRendererProps {
    block: EmailBlock;
    replaceVariables: (text: string) => string;
}
interface StyleOnlyRendererProps {
    block: EmailBlock;
}

declare function HeaderBlockRenderer({ block, replaceVariables }: BlockRendererProps): react_jsx_runtime.JSX.Element;

declare function TextBlockRenderer({ block, replaceVariables }: BlockRendererProps): react_jsx_runtime.JSX.Element;

declare function ImageBlockRenderer({ block, replaceVariables }: BlockRendererProps): react_jsx_runtime.JSX.Element;

declare function ButtonBlockRenderer({ block, replaceVariables }: BlockRendererProps): react_jsx_runtime.JSX.Element;

declare function ProductBlockRenderer({ block, replaceVariables }: BlockRendererProps): react_jsx_runtime.JSX.Element;

declare function DividerBlockRenderer({ block }: StyleOnlyRendererProps): react_jsx_runtime.JSX.Element;

declare function SpacerBlockRenderer({ block }: StyleOnlyRendererProps): react_jsx_runtime.JSX.Element;

declare function FooterBlockRenderer({ block, replaceVariables }: BlockRendererProps): react_jsx_runtime.JSX.Element;

declare const initialBlocks: EmailBlock[];
declare const BLOCK_TEMPLATES: Record<EmailBlockType, Omit<EmailBlock, 'id'>>;

declare const DEFAULT_TEMPLATES: {
    readonly SMS: "Hi {{customer_name}}, your {{subscription_name}} subscription is due for renewal. Amount: {{amount}}";
    readonly WHATSAPP: "🎉 Hello {{customer_name}}! Your subscription *{{subscription_name}}* is now active. Thank you for choosing us!";
    readonly WEB_PUSH: "🔔 {{customer_name}} | Your subscription {{subscription_name}} needs attention!";
};
declare const TEMPLATE_LIMITS: {
    readonly SMS: {
        readonly MAX_LENGTH: 1530;
        readonly WARNING_LENGTH: 160;
        readonly SEGMENT_LENGTH: 160;
    };
    readonly WHATSAPP: {
        readonly MAX_LENGTH: 1024;
        readonly WARNING_LENGTH: 800;
    };
    readonly WEB_PUSH: {
        readonly MAX_LENGTH: 150;
        readonly WARNING_LENGTH: 120;
        readonly TITLE_MAX_LENGTH: 50;
        readonly BODY_MAX_LENGTH: 100;
    };
};
declare const SAMPLE_DATA: {
    readonly customer_name: "John Doe";
    readonly product_name: "iPhone 15 Pro";
    readonly subscription_name: "Back in Stock Alert";
    readonly amount: "$999";
    readonly store_name: "Your Store";
};
declare const getSmsSegmentCount: (text: string) => number;
declare const validateSmsTemplate: (text: string) => {
    isValid: boolean;
    isWarning: boolean;
    length: number;
    maxLength: 1530;
    warningLength: 160;
    segments: number;
};
declare const validateWhatsappTemplate: (text: string) => {
    isValid: boolean;
    isWarning: boolean;
    length: number;
    maxLength: 1024;
    warningLength: 800;
};
declare const validateWebPushTemplate: (text: string) => {
    isValid: boolean;
    isWarning: boolean;
    length: number;
    maxLength: 150;
    warningLength: 120;
};
declare const replaceVariablesWithSampleData: (text: string) => string;
declare const availableLanguages: Language[];
declare const TEMPLATE_NAME: {
    BACK_IN_STOCK: string;
    CONFIRMATION: string;
};

declare const VARIABLES: {
    variable: string;
    example: string;
    description: string;
}[];

declare function useBlockManager(blocks: EmailBlock[], onBlocksChange: (blocks: EmailBlock[]) => void): {
    addBlock: (type: EmailBlockType, index?: number) => void;
    removeBlock: (id: string) => void;
    updateBlock: (id: string, updates: Partial<EmailBlock>) => void;
    moveBlock: (fromIndex: number, toIndex: number) => void;
};

interface DragState {
    draggedBlockId: string | null;
    dragOverIndex: number | null;
}
declare function useDragAndDrop(blocks: any[], onMoveBlock: (fromIndex: number, toIndex: number) => void): {
    dragState: DragState;
    handleDragStart: (e: React.DragEvent, blockId: string) => void;
    handleDragOver: (e: React.DragEvent, index: number) => void;
    handleDragLeave: () => void;
    handleDrop: (e: React.DragEvent, dropIndex: number) => void;
    handleDragEnd: () => void;
};

interface UseTemplateLoaderResult {
    templates?: Template[];
    template: Template | null;
    loading: boolean;
    error: string | null;
    loadTemplate: (templateName: string) => void;
    saveTemplate: (templateData: Omit<Template, 'id' | 'shop' | 'created_at' | 'updated_at'>) => void;
    clearTemplate: () => void;
    updateTemplates: (newTemplates: Template[]) => void;
    selectTemplate: (template: Template) => void;
}
declare function useTemplateLoader(): UseTemplateLoaderResult;

export { BLOCK_TEMPLATES, BlockList, ButtonBlockRenderer, ButtonBlockSettings, DEFAULT_TEMPLATES, DividerBlockRenderer, DividerBlockSettings, EmailBlockRenderer, EmailBlockSettings, EmailEditorEmptyState, EmailEditorErrorState, EmailEditorLayout, EmailEditorSidebar, EmailPreviewPanel, EmailTemplateEditor, FooterBlockRenderer, FooterBlockSettings, HeaderBlockRenderer, HeaderBlockSettings, ImageBlockRenderer, ImageBlockSettings, ProductBlockRenderer, ProductBlockSettings, SAMPLE_DATA, SpacerBlockRenderer, SpacerBlockSettings, TEMPLATE_LIMITS, TEMPLATE_NAME, TextBlockRenderer, TextBlockSettings, VARIABLES, VariablePanel, availableLanguages, getSmsSegmentCount, initialBlocks, replaceVariablesWithSampleData, useBlockManager, useDragAndDrop, useTemplateLoader, validateSmsTemplate, validateWebPushTemplate, validateWhatsappTemplate };
export type { EmailBlock, EmailBlockType, Language, Template, UseTemplateLoaderResult };
