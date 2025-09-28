import { EmailBlock } from "../../interfaces";
export interface BlockSettingsProps {
    block: EmailBlock;
    onUpdate: (updates: Partial<EmailBlock>) => void;
}
export interface ContentUpdateFunction {
    (updates: any): void;
}
export interface StyleUpdateFunction {
    (updates: any): void;
}
export interface BlockSettingsComponentProps {
    block: EmailBlock;
    updateContent: ContentUpdateFunction;
    updateStyles: StyleUpdateFunction;
}
export interface BlockSettingsStyleOnlyProps {
    block: EmailBlock;
    updateStyles: StyleUpdateFunction;
}
//# sourceMappingURL=BlockSettingsTypes.d.ts.map