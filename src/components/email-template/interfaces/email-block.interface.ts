import { EmailBlockType } from "../types/email-block-type.type";

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