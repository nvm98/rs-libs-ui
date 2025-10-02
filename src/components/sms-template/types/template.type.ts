import { SMSBlock } from './sms-block-type.type';

export interface SMSTemplate {
  id?: string;
  shop?: string;
  name: string;
  content: string;
  blocks: SMSBlock[];
  locale: string;
  type: 'sms';
  engine: 'liquid' | 'handlebars' | 'mustache';
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  // SMS specific fields
  sender_id?: string;
  encoding?: 'GSM7' | 'UCS2';
  max_length?: number;
}
