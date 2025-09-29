export interface SMSTemplate {
  id?: string;
  shop?: string;
  name: string;
  content: string;
  blocks?: any;
  locale: string;
  type: 'sms';
  engine: 'liquid' | 'handlebars' | 'mustache';
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  // SMS specific fields
  message: string;
  sender_id?: string;
  encoding?: 'GSM7' | 'UCS2';
  max_length?: number;
  variables?: string[];
}
