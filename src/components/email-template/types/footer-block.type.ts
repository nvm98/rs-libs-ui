import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export type FooterBlock = EmailBlock & {
  type: EmailBlockType.FOOTER;
  content: {
    companyInfo: string; // Rich Text - company name, address, copyright info
    socialLinks: SocialLink[]; // Array of social media links
    unsubscribeLink: string; // URL for unsubscribe (required by law)
    preferenceLink: string; // URL for email preferences (optional)
    backgroundColor: string; // Background color for footer
  };
  styles: {
    color: string;
    fontSize: string;
    textAlign: 'left' | 'center' | 'right';
    padding: string;
  };
};
