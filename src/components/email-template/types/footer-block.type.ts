import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type FooterBlock = EmailBlock & {
  type: EmailBlockType.FOOTER;
  content: {
    text: string;
    unsubscribeText: string;
    showSocial: boolean;
  };
  styles: {
    backgroundColor: string;
    color: string;
    fontSize: string;
    textAlign: 'left' | 'center' | 'right';
    padding: string;
  };
};
