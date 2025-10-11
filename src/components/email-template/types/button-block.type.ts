import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type ButtonBlock = EmailBlock & {
  type: EmailBlockType.BUTTON;
  content: {
    buttonText: string;
    linkUrl: string;
    backgroundColor: string;
    textColor: string;
    padding: string;
    borderRadius: string;
    alignment: 'left' | 'center' | 'right';
  };
  styles: {};
};
