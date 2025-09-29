import { WhatsAppBlockType } from '../types';

export const WHATSAPP_BLOCK_TYPES = [
  {
    type: WhatsAppBlockType.HEADER,
    label: 'Header',
    icon: 'header',
    description: 'Add a header with text or media'
  },
  {
    type: WhatsAppBlockType.BODY,
    label: 'Body',
    icon: 'text',
    description: 'Main message content'
  },
  {
    type: WhatsAppBlockType.FOOTER,
    label: 'Footer',
    icon: 'footer',
    description: 'Add footer text'
  },
  {
    type: WhatsAppBlockType.BUTTONS,
    label: 'Buttons',
    icon: 'button',
    description: 'Add interactive buttons'
  },
  {
    type: WhatsAppBlockType.MEDIA,
    label: 'Media',
    icon: 'image',
    description: 'Add image, video or document'
  },
  {
    type: WhatsAppBlockType.VARIABLE,
    label: 'Variable',
    icon: 'variable',
    description: 'Insert dynamic variable'
  }
];

export const WHATSAPP_CATEGORIES = [
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'UTILITY', label: 'Utility' },
  { value: 'AUTHENTICATION', label: 'Authentication' }
];

export const WHATSAPP_BUTTON_TYPES = [
  { value: 'QUICK_REPLY', label: 'Quick Reply' },
  { value: 'URL', label: 'URL' },
  { value: 'PHONE_NUMBER', label: 'Phone Number' }
];

export const WHATSAPP_MEDIA_TYPES = [
  { value: 'IMAGE', label: 'Image' },
  { value: 'VIDEO', label: 'Video' },
  { value: 'DOCUMENT', label: 'Document' }
];

export const WHATSAPP_HEADER_FORMATS = [
  { value: 'TEXT', label: 'Text' },
  { value: 'IMAGE', label: 'Image' },
  { value: 'VIDEO', label: 'Video' },
  { value: 'DOCUMENT', label: 'Document' }
];

export { AVAILABLE_LANGUAGES } from './languages';
