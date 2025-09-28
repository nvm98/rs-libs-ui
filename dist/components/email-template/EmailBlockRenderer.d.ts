import { EmailBlock } from './interfaces/email-block.interface';
interface EmailBlockRendererProps {
    blocks: EmailBlock[];
    replaceVariables: (text: string) => string;
    selectedBlockId?: string | null;
}
export declare function EmailBlockRenderer({ blocks, replaceVariables, selectedBlockId }: EmailBlockRendererProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EmailBlockRenderer.d.ts.map