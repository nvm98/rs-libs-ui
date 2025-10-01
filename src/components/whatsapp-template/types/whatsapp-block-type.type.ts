export enum WhatsAppBlockType {
  HEADER = 'header',
  BODY = 'body',
  FOOTER = 'footer',
  BUTTONS = 'buttons',
}

export interface WhatsAppBlockBase {
  id: string;
  type: WhatsAppBlockType;
  visible?: boolean;
}

export interface WhatsAppHeaderBlock extends WhatsAppBlockBase {
  type: WhatsAppBlockType.HEADER;
  format: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  text?: string;
  media_url?: string;
}

export interface WhatsAppBodyBlock extends WhatsAppBlockBase {
  type: WhatsAppBlockType.BODY;
  text: string;
  variables?: string[];
}

export interface WhatsAppFooterBlock extends WhatsAppBlockBase {
  type: WhatsAppBlockType.FOOTER;
  text: string;
}

export interface WhatsAppButton {
  type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
  text: string;
  url?: string;
  phone_number?: string;
}

export interface WhatsAppButtonsBlock extends WhatsAppBlockBase {
  type: WhatsAppBlockType.BUTTONS;
  buttons: WhatsAppButton[];
}

export type WhatsAppBlock =
  | WhatsAppHeaderBlock
  | WhatsAppBodyBlock
  | WhatsAppFooterBlock
  | WhatsAppButtonsBlock;

