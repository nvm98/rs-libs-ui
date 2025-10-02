export type SMSBlockType = 'body';

export interface SMSBlock {
  id: string;
  type: SMSBlockType;
  content: string;
  visible?: boolean;
}
