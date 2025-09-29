export interface WhatsAppTemplate {
  id?: string;
  shop?: string;
  name: string;
  content: string;
  blocks?: any;
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
  components?: WhatsAppComponent[];
}

export interface WhatsAppComponent {
  type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
  format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  text?: string;
  example?: {
    header_text?: string[];
    body_text?: string[][];
  };
  buttons?: WhatsAppButton[];
}

export interface WhatsAppButton {
  type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
  text: string;
  url?: string;
  phone_number?: string;
}
