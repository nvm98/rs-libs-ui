export enum SMSBlockType {
  TEXT = 'text',
  VARIABLE = 'variable',
  LINK = 'link',
  PHONE = 'phone',
  EMOJI = 'emoji'
}

export interface SMSBlockBase {
  id: string;
  type: SMSBlockType;
  order: number;
  settings?: Record<string, any>;
}

export interface SMSTextBlock extends SMSBlockBase {
  type: SMSBlockType.TEXT;
  text: string;
}

export interface SMSVariableBlock extends SMSBlockBase {
  type: SMSBlockType.VARIABLE;
  variable_name: string;
  default_value?: string;
}

export interface SMSLinkBlock extends SMSBlockBase {
  type: SMSBlockType.LINK;
  url: string;
  text?: string;
  shorten?: boolean;
}

export interface SMSPhoneBlock extends SMSBlockBase {
  type: SMSBlockType.PHONE;
  phone_number: string;
  country_code?: string;
}

export interface SMSEmojiBlock extends SMSBlockBase {
  type: SMSBlockType.EMOJI;
  emoji: string;
}

export type SMSBlock = 
  | SMSTextBlock
  | SMSVariableBlock
  | SMSLinkBlock
  | SMSPhoneBlock
  | SMSEmojiBlock;
