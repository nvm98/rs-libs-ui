import { EmailBlockType } from "../types";

export interface EmailBlock {
  id: string;
  type: EmailBlockType;
  content: any;
  styles: any;
  canDelete?: boolean;
  canDragable?: boolean;
  isRequired?: boolean;
  isUnique?: boolean;
}