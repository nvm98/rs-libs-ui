import { Language } from "../interfaces";

// Default template constants
export const DEFAULT_TEMPLATES = {
  SMS: "Hi {{customer_name}}, your {{subscription_name}} subscription is due for renewal. Amount: {{amount}}",
  WHATSAPP: "🎉 Hello {{customer_name}}! Your subscription *{{subscription_name}}* is now active. Thank you for choosing us!",
  WEB_PUSH: "🔔 {{customer_name}} | Your subscription {{subscription_name}} needs attention!",
} as const;

// Template validation limits
export const TEMPLATE_LIMITS = {
  SMS: {
    MAX_LENGTH: 1530,
    WARNING_LENGTH: 160,
    SEGMENT_LENGTH: 160,
  },
  WHATSAPP: {
    MAX_LENGTH: 1024,
    WARNING_LENGTH: 800,
  },
  WEB_PUSH: {
    MAX_LENGTH: 150,
    WARNING_LENGTH: 120,
    TITLE_MAX_LENGTH: 50,
    BODY_MAX_LENGTH: 100,
  },
} as const;

// Sample data for previews
export const SAMPLE_DATA = {
  customer_name: 'John Doe',
  product_name: 'iPhone 15 Pro',
  subscription_name: 'Back in Stock Alert',
  amount: '$999',
  store_name: 'Your Store',
} as const;

// Helper functions
export const getSmsSegmentCount = (text: string): number => 
  Math.ceil(text.length / TEMPLATE_LIMITS.SMS.SEGMENT_LENGTH);

export const validateSmsTemplate = (text: string) => {
  const length = text.length;
  return {
    isValid: length <= TEMPLATE_LIMITS.SMS.MAX_LENGTH,
    isWarning: length > TEMPLATE_LIMITS.SMS.WARNING_LENGTH,
    length,
    maxLength: TEMPLATE_LIMITS.SMS.MAX_LENGTH,
    warningLength: TEMPLATE_LIMITS.SMS.WARNING_LENGTH,
    segments: getSmsSegmentCount(text),
  };
};

export const validateWhatsappTemplate = (text: string) => {
  const length = text.length;
  return {
    isValid: length <= TEMPLATE_LIMITS.WHATSAPP.MAX_LENGTH,
    isWarning: length > TEMPLATE_LIMITS.WHATSAPP.WARNING_LENGTH,
    length,
    maxLength: TEMPLATE_LIMITS.WHATSAPP.MAX_LENGTH,
    warningLength: TEMPLATE_LIMITS.WHATSAPP.WARNING_LENGTH,
  };
};

export const validateWebPushTemplate = (text: string) => {
  const length = text.length;
  return {
    isValid: length <= TEMPLATE_LIMITS.WEB_PUSH.MAX_LENGTH,
    isWarning: length > TEMPLATE_LIMITS.WEB_PUSH.WARNING_LENGTH,
    length,
    maxLength: TEMPLATE_LIMITS.WEB_PUSH.MAX_LENGTH,
    warningLength: TEMPLATE_LIMITS.WEB_PUSH.WARNING_LENGTH,
  };
};

export const replaceVariablesWithSampleData = (text: string): string => {
  return text.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
    return SAMPLE_DATA[variable as keyof typeof SAMPLE_DATA] || match;
  });
};

export const availableLanguages: Language[] = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'fr', label: 'Français' },
    { value: 'es', label: 'Español' },
    { value: 'de', label: 'Deutsch' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'zh', label: '中文' },
    { value: 'pt', label: 'Português' },
    { value: 'it', label: 'Italiano' },
    { value: 'ru', label: 'Русский' },
    { value: 'ar', label: 'العربية' },
    { value: 'hi', label: 'हिन्दी' },
    { value: 'th', label: 'ไทย' },
    { value: 'nl', label: 'Nederlands' },
    { value: 'sv', label: 'Svenska' },
    { value: 'da', label: 'Dansk' },
    { value: 'no', label: 'Norsk' },
    { value: 'fi', label: 'Suomi' },
    { value: 'pl', label: 'Polski' },
  ];

export const TEMPLATE_NAME = {
  BACK_IN_STOCK: 'back-in-stock',
  CONFIRMATION: 'confirmation'
}