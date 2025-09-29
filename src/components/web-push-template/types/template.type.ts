export interface WebPushTemplate {
  id?: string;
  shop?: string;
  name: string;
  content: string;
  blocks?: any;
  locale: string;
  type: 'web-push';
  engine: 'liquid' | 'handlebars' | 'mustache';
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  // Web Push specific fields
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  timestamp?: number;
  actions?: WebPushAction[];
  data?: Record<string, any>;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  renotify?: boolean;
  vibrate?: number[];
}

export interface WebPushAction {
  action: string;
  title: string;
  icon?: string;
}
