import { EmailBlock } from "./interfaces/email-block.interface";
interface EmailPreviewPanelProps {
    blocks: EmailBlock[];
    selectedBlockId: string | null;
    replaceVariables: (text: string) => string;
}
export declare function EmailPreviewPanel({ blocks, selectedBlockId, replaceVariables }: EmailPreviewPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EmailPreviewPanel.d.ts.map