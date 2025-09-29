import { WebPushBlockType } from '../types';

export const WEB_PUSH_BLOCK_TYPES = [
  {
    type: WebPushBlockType.TITLE,
    label: 'Title',
    icon: 'title',
    description: 'Notification title'
  },
  {
    type: WebPushBlockType.BODY,
    label: 'Body',
    icon: 'text',
    description: 'Notification body text'
  },
  {
    type: WebPushBlockType.ICON,
    label: 'Icon',
    icon: 'icon',
    description: 'Small notification icon'
  },
  {
    type: WebPushBlockType.IMAGE,
    label: 'Image',
    icon: 'image',
    description: 'Large notification image'
  },
  {
    type: WebPushBlockType.BADGE,
    label: 'Badge',
    icon: 'badge',
    description: 'Badge icon'
  },
  {
    type: WebPushBlockType.ACTIONS,
    label: 'Actions',
    icon: 'button',
    description: 'Action buttons'
  },
  {
    type: WebPushBlockType.VARIABLE,
    label: 'Variable',
    icon: 'variable',
    description: 'Dynamic variable'
  },
  {
    type: WebPushBlockType.SETTINGS,
    label: 'Settings',
    icon: 'settings',
    description: 'Notification settings'
  }
];

export const WEB_PUSH_DIRECTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: 'ltr', label: 'Left to Right' },
  { value: 'rtl', label: 'Right to Left' }
];

export const WEB_PUSH_LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'zh', label: 'Chinese' }
];

export const DEFAULT_VIBRATION_PATTERNS = [
  { value: '200', label: 'Short (200ms)' },
  { value: '200,100,200', label: 'Double tap' },
  { value: '100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100', label: 'SOS' },
  { value: '500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500', label: 'Custom pattern' }
];

export const MAX_TITLE_LENGTH = 50;
export const MAX_BODY_LENGTH = 160;
export const MAX_ACTIONS = 2;
