export type WebPushBlockType = 'title' | 'body';

export interface WebPushBlock {
  id: string;
  type: WebPushBlockType;
  content: string;
  visible?: boolean;
  image?: string;
}
