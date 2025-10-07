import { SMSBlock } from "@sms-template/types";

export const INITIAL_BLOCKS: SMSBlock[] = [
  {
    id: 'body-1',
    type: 'body',
    content: 'Hello {{customer_first_name}}! Thank you for your interest in our products. We\'ll keep you updated! - {{shop_name}}'
  }
]