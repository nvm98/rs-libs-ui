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

export interface BlockSettingsComponentProps<T extends EmailBlock> {
  block: T;
  updateContent: ContentUpdateFunction;
  updateStyles: StyleUpdateFunction;
}

export interface BlockSettingsStyleOnlyProps {
  block: EmailBlock;
  updateStyles: StyleUpdateFunction;
}
