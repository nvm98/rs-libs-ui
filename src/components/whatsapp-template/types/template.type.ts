export interface WhatsAppTemplate {
  id?: string;
  shop?: string;
  name: string;
  locale: string;
  type: 'whatsapp';
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  // WhatsApp Business API specific fields
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  language: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DISABLED';
  // Single template configuration
  template: WhatsAppTemplateConfig;
}

// WhatsApp Business API Template Configuration
export interface WhatsAppTemplateConfig {
  // Header component (optional)
  header?: {
    type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    text?: string; // For TEXT type
    media_url?: string; // For media types
    variables?: string[]; // Placeholder variables like {{1}}
  };

  // Body component (required)
  body: {
    text: string; // Template text with variables like {{1}}, {{2}}
    variables?: string[]; // Variable placeholders
  };

  // Footer component (optional)
  footer?: {
    text: string; // Static text only, no variables allowed
  };

  // Buttons component (optional)
  buttons?: WhatsAppButton[];
}

export interface WhatsAppButton {
  type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
  text: string;
  url?: string; // For URL buttons, can contain variables like {{1}}
  phone_number?: string; // For phone number buttons
}
