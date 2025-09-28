import { EmailBlock } from './interfaces/email-block.interface';
interface EmailBlockSettingsProps {
    block: EmailBlock;
    onUpdate: (updates: Partial<EmailBlock>) => void;
}
export declare function EmailBlockSettings({ block, onUpdate }: EmailBlockSettingsProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=EmailBlockSettings.d.ts.map