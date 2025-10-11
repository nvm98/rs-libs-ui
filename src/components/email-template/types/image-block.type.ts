import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type ImageBlock = EmailBlock & {
  type: EmailBlockType.IMAGE;
  content: {
    src: string;
    alt: string;
    link: string;
  };
  styles: {
    width: string;
    maxWidth: string;
    padding: string;
    textAlign: 'left' | 'center' | 'right';
  };
};
