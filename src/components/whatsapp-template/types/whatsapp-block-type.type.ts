export enum WhatsAppBlockType {
  HEADER = 'header',
  BODY = 'body',
  FOOTER = 'footer',
  BUTTONS = 'buttons',
  MEDIA = 'media',
  VARIABLE = 'variable'
}

export interface WhatsAppBlockBase {
  id: string;
  type: WhatsAppBlockType;
  order: number;
  settings?: Record<string, any>;
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

export interface WhatsAppButtonsBlock extends WhatsAppBlockBase {
  type: WhatsAppBlockType.BUTTONS;
  buttons: Array<{
    type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
    text: string;
    url?: string;
    phone_number?: string;
  }>;
}

export interface WhatsAppMediaBlock extends WhatsAppBlockBase {
  type: WhatsAppBlockType.MEDIA;
  media_type: 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO';
  media_url: string;
  caption?: string;
}

export interface WhatsAppVariableBlock extends WhatsAppBlockBase {
  type: WhatsAppBlockType.VARIABLE;
  variable_name: string;
  default_value?: string;
}

export type WhatsAppBlock = 
  | WhatsAppHeaderBlock
  | WhatsAppBodyBlock
  | WhatsAppFooterBlock
  | WhatsAppButtonsBlock
  | WhatsAppMediaBlock
  | WhatsAppVariableBlock;
