import { EmailBlock } from "../../interfaces";

export interface BlockRendererProps {
  block: EmailBlock;
  replaceVariables: (text: string) => string;
}

export interface StyleOnlyRendererProps {
  block: EmailBlock;
}

export interface RendererComponentProps {
  block: EmailBlock;
  replaceVariables?: (text: string) => string;
}

export interface RendererProps<T extends EmailBlock> {
  block: T;
}
