import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type SpacerBlock = EmailBlock & {
  type: EmailBlockType.SPACER;
  content: {
    height: string;
    backgroundColor: string;
  };
  styles: {};
};
