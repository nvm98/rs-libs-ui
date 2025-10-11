import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type ImageBlock = EmailBlock & {
  type: EmailBlockType.IMAGE;
  content: {
    imageUrl: string;
    altText: string;
    linkUrl: string;
    caption: string;
  };
  styles: {
    width: string;
    alignment: 'left' | 'center' | 'right';
    padding: string;
  };
};
