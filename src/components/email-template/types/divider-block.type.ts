import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type DividerBlock = EmailBlock & {
  type: EmailBlockType.DIVIDER;
  content: {};
  styles: {
    borderColor: string;
    margin: string;
  };
};
