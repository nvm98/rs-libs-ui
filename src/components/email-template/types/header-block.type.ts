import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type HeaderBlock = EmailBlock & {
  type: EmailBlockType.HEADER;
  content: {
    logoUrl: string;
    logoAltText: string;
    logoLinkUrl: string;
    showWebViewLink: boolean;
  };
  styles: {
    backgroundColor: string;
    padding: string;
    alignment: 'left' | 'center' | 'right';
    logoStyles: {
      width?: string;
      borderRadius?: string;
      padding?: string;
    };
  };
};
