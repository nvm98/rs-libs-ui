import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type HeaderBlock = EmailBlock & {
  type: EmailBlockType.HEADER;
  content: {
    logoUrl: string;
    logoAltText: string;
    logoLinkUrl: string;
    backgroundColor: string;
    showWebViewLink: boolean;
    alignment: 'left' | 'center' | 'right';
  };
  styles: {
    backgroundColor: string;
    padding: string;
    textAlign: 'left' | 'center' | 'right';
    logoStyles: {
      width?: string;
      borderRadius?: string;
      padding?: string;
    };
  };
};
