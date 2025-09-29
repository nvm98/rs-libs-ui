import { SMSBlockType } from '../types';

export const SMS_BLOCK_TYPES = [
  {
    type: SMSBlockType.TEXT,
    label: 'Text',
    icon: 'text',
    description: 'Add text content'
  },
  {
    type: SMSBlockType.VARIABLE,
    label: 'Variable',
    icon: 'variable',
    description: 'Insert dynamic variable'
  },
  {
    type: SMSBlockType.PHONE,
    label: 'Phone',
    icon: 'phone',
    description: 'Add phone number'
  },
  {
    type: SMSBlockType.EMOJI,
    label: 'Emoji',
    icon: 'emoji',
    description: 'Add emoji'
  }
];

export const SMS_ENCODINGS = [
  { value: 'GSM7', label: 'GSM 7-bit' },
  { value: 'UCS2', label: 'UCS-2 (Unicode)' }
];

export const MAX_SMS_LENGTH_GSM7 = 160;
export const MAX_SMS_LENGTH_UCS2 = 70;

export const COMMON_EMOJIS = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
  '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
  '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
  '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏'
];
