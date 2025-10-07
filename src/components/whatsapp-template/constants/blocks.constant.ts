import { WhatsAppBlockType } from "@whatsapp-template/types";

export const INITIAL_BLOCKS = [
  {
    id: 'header-1',
    type: WhatsAppBlockType.HEADER,
    format: 'TEXT',
    text: 'Hello {{customer_first_name}}!',
  },
  {
    id: 'body-1',
    type: WhatsAppBlockType.BODY,
    text: 'Thank you for your interest in our products. We\'ll keep you updated!',
    variables: []
  },
  {
    id: 'footer-1',
    type: WhatsAppBlockType.FOOTER,
    text: 'Best regards, {{shop_name}}'
  },
  {
    id: 'buttons-1',
    type: WhatsAppBlockType.BUTTONS,
    buttons: [
      {
          type: 'QUICK_REPLY',
          text: 'Yes, notify me'
      },
      {
          type: 'URL',
          text: 'Visit Store',
          url: 'https://{{shop_url}}'
      }
    ]
  }
]