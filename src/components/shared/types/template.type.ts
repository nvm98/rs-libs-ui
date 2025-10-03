import { TemplateEngine, TemplateType } from "./common.type";

export interface Template {
  id?: string;
  shop?: string;
  name: string;
  content: string;
  blocks?: any;
  locale: string,
  type: TemplateType;
  engine: TemplateEngine;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  metadata?: any;
}