export enum WebPushBlockType {
  TITLE = 'title',
  BODY = 'body',
  ICON = 'icon',
  IMAGE = 'image',
  BADGE = 'badge',
  ACTIONS = 'actions',
  VARIABLE = 'variable',
  SETTINGS = 'settings'
}

export interface WebPushBlockBase {
  id: string;
  type: WebPushBlockType;
  order: number;
  settings?: Record<string, any>;
}

export interface WebPushTitleBlock extends WebPushBlockBase {
  type: WebPushBlockType.TITLE;
  text: string;
  maxLength?: number;
}

export interface WebPushBodyBlock extends WebPushBlockBase {
  type: WebPushBlockType.BODY;
  text: string;
  maxLength?: number;
}

export interface WebPushIconBlock extends WebPushBlockBase {
  type: WebPushBlockType.ICON;
  icon_url: string;
  size?: number;
}

export interface WebPushImageBlock extends WebPushBlockBase {
  type: WebPushBlockType.IMAGE;
  image_url: string;
  alt_text?: string;
}

export interface WebPushBadgeBlock extends WebPushBlockBase {
  type: WebPushBlockType.BADGE;
  badge_url: string;
}

export interface WebPushActionsBlock extends WebPushBlockBase {
  type: WebPushBlockType.ACTIONS;
  actions: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

export interface WebPushVariableBlock extends WebPushBlockBase {
  type: WebPushBlockType.VARIABLE;
  variable_name: string;
  default_value?: string;
}

export interface WebPushSettingsBlock extends WebPushBlockBase {
  type: WebPushBlockType.SETTINGS;
  requireInteraction?: boolean;
  silent?: boolean;
  renotify?: boolean;
  tag?: string;
  timestamp?: number;
  vibrate?: number[];
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
}

export type WebPushBlock = 
  | WebPushTitleBlock
  | WebPushBodyBlock
  | WebPushIconBlock
  | WebPushImageBlock
  | WebPushBadgeBlock
  | WebPushActionsBlock
  | WebPushVariableBlock
  | WebPushSettingsBlock;
