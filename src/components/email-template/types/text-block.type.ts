import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type TextBlock = EmailBlock & {
  type: EmailBlockType.TEXT;
  content: {
    text: string;
    variables: boolean;
  };
  styles: {
    fontSize: string;
    color: string;
    textAlign: 'left' | 'center' | 'right';
    padding: string;
  };
};
