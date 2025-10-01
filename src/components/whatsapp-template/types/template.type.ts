import { WhatsAppBlock } from './whatsapp-block-type.type';

export interface WhatsAppTemplate {
  id?: string;
  shop?: string;
  name: string;
  content: string;
  blocks: WhatsAppBlock[];
  locale: string;
  type: 'whatsapp';
  engine: 'liquid' | 'handlebars' | 'mustache';
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  // WhatsApp specific fields
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  language: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DISABLED';
}
