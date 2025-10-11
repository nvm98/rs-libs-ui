import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type ButtonBlock = EmailBlock & {
  type: EmailBlockType.BUTTON;
  content: {
    text: string;
    link: string;
    variables: boolean;
  };
  styles: {
    backgroundColor: string;
    color: string;
    padding: string;
    borderRadius: string;
    textAlign: 'left' | 'center' | 'right';
    margin: string;
  };
};
