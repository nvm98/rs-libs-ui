import { EmailBlock } from "../../interfaces";

export interface BlockRendererProps {
  block: EmailBlock;
  replaceVariables: (text: string) => string;
}

export interface StyleOnlyRendererProps {
  block: EmailBlock;
}
