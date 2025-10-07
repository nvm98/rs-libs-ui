import { TemplateEngine, Channel } from "./common.type";

export interface Template {
  id?: string;
  content: string;
  blocks: any[];
  locale: string,
  channel: Channel,
  type: string;
  engine: TemplateEngine;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  metadata?: any;
}