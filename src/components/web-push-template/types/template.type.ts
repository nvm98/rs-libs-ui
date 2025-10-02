import { WebPushBlock } from './web-push-block-type.type';

export interface WebPushTemplate {
  id?: string;
  shop?: string;
  name: string;
  content: string;
  blocks: WebPushBlock[];
  locale: string;
  type: 'web-push';
  engine: 'liquid' | 'handlebars' | 'mustache';
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  category?: string;
  language?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  // Web Push specific fields
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  timestamp?: number;
  data?: Record<string, any>;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  renotify?: boolean;
  vibrate?: number[];
}
