import { TemplateEngine, Channel } from "./common.type";

export interface Template {
  id?: string;
  content: string;
  blocks?: any;
  locale: string,
  channel: Channel,
  type: string;
  engine: TemplateEngine;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  metadata?: any;
}