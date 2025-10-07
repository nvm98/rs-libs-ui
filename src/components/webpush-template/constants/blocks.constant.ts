import { WebPushBlock } from "../types";

export const INITIAL_BLOCKS: WebPushBlock[] = [
  {
    id: 'title-1',
    type: 'title',
    content: 'Hi {{customer.first_name}}!',
    visible: true
  },
  {
    id: 'body-1',
    type: 'body',
    content: 'Your order is ready for pickup. Click to view details.',
    visible: true
  }
];