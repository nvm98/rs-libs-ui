import { EmailBlock } from "../interfaces/email-block.interface";
import { EmailBlockType } from "../types";

export const INITIAL_BLOCKS: EmailBlock[] = [
    {
      id: 'subject-0',
      type: EmailBlockType.SUBJECT,
      content: {
        subjectLine: "🎉 It's Back! The item you've been waiting for is here: {{product_title}}!",
        previewText: 'Don\'t miss out this time! Stock is limited. Click to shop now before it\'s gone again.'
      },
      styles: {},
      canDelete: false,
      canDragable: false,
      isRequired: false
    },
    {
      id: 'header-1',
      type: EmailBlockType.HEADER,
      content: {
        logoUrl: '{{shop_logo_url}}',
        logoAltText: '{{shop_name}}',
        logoLinkUrl: '{{shop_url}}',
        showWebViewLink: false,
        alignment: 'center'
      },
      styles: {
        backgroundColor: '#ffffff',
        padding: '20px',
        logoStyles: {
          width: '120px',
          borderRadius: '0px',
          padding: '0px'
        }
      },
      canDelete: true,
      canDragable: true,
      isRequired: false
    },
    { 
      id: 'text-2', 
      type: EmailBlockType.TEXT, 
      content: { 
        text: 'Hi {{customer_first_name}}, your order is ready!We have exciting news! The item you asked to be notified about, the {{product_title}}, is officially back in stock! | Immediate, personalized, and clear announcement.',
      }, 
      styles: { 
        fontSize: '14px', 
        color: '#333333', 
        textAlign: 'left', 
        padding: '16px' 
      },
      canDelete: true,
      canDragable: true,
      isRequired: false
    },
    {
      id: 'image-3',
      type: EmailBlockType.IMAGE,
      content: {
        imageUrl: 'https://blog.adobe.com/en/publish/2024/10/14/media_1ca79b205381242c5f8beaaee2f0e1cfb2aa8f324.png?width=750&format=png&optimize=medium',
        altText: 'A descriptive image',
        linkUrl: '',
        caption: ''
      },
      styles: {
        width: '100%',
        padding: '0px',
        alignment: 'center'
      },
      canDelete: true,
      canDragable: true,
      isRequired: false
    },
    {
      id: 'product-4',
      type: EmailBlockType.PRODUCT,
      content: {
        products: [
          {
            id: 'product-1',
            name: '{{product_title}}',
            price: '{{product_price}}',
            description: '{{product_description}}',
            imageUrl: '{{product_image_url}}',
            productUrl: '{{product_url}}'
          },
        ],
        productLayout: 'single',
        showProductName: true,
        showProductPrice: true,
        showProductDescription: false,
        showCTAButton: true,
        buttonText: 'Buy Now'
      },
      styles: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #e1e3e5',
        borderRadius: '8px',
        padding: '20px',
        margin: '0px',
        alignment: 'left'
      },
      canDelete: true,
      canDragable: true,
      isRequired: false
    },
    {
      id: 'button-5',
      type: EmailBlockType.BUTTON,
      content: {
        buttonText: 'Shop Now',
        linkUrl: '{{shop_url}}',
      },
      styles: {
        backgroundColor: '#007ace',
        textColor: '#ffffff',
        padding: '14px 32px',
        borderRadius: '6px',
        alignment: 'center'
      },
      canDelete: true,
      canDragable: true,
      isRequired: false
    },
    {
      id: 'footer-6',
      type: EmailBlockType.FOOTER,
      content: {
        companyInfo: '© 2024 {{shop_name}}. All rights reserved.\n123 Business Street, City, State 12345',
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com/yourstore' },
          { platform: 'instagram', url: 'https://instagram.com/yourstore' }
        ],
        unsubscribeLink: 'https://{{shop_domain}}/unsubscribe',
        preferenceLink: 'https://{{shop_domain}}/preferences',
        backgroundColor: '#f6f6f7'
      },
      styles: {
        color: '#6d7175',
        fontSize: '14px',
        textAlign: 'center',
        padding: '24px'
      },
      canDelete: false,
      canDragable: false,
      isRequired: false
    }
  ];

  export const BLOCK_TEMPLATES: Record<EmailBlockType, Omit<EmailBlock, 'id'>> = {
  subject: {
    type: EmailBlockType.SUBJECT,
    content: {
      subjectLine: 'Your order update',
      previewText: 'Thank you for your order! Here\'s what\'s happening next.'
    },
    styles: {},
    canDelete: false,
    canDragable: false,
    isRequired: true,
    isUnique: true
  },
  header: {
    type: EmailBlockType.HEADER,
    content: {
      logoUrl: '{{shop_logo_url}}',
      logoAltText: '{{shop_name}}',
      logoLinkUrl: '{{shop_url}}',
      showWebViewLink: false,
      alignment: 'center'
    },
    styles: {
      backgroundColor: '#ffffff',
      padding: '20px',
      logoStyles: {
        width: '120px',
        borderRadius: '0px',
        padding: '0px'
      }
    },
    canDelete: true,
    canDragable: true,
    isRequired: false,
    isUnique: true
  },
  text: {
    type: EmailBlockType.TEXT,
    content: {
      text: 'Your text content here...',
      variables: true
    },
    styles: {
      fontSize: '14px',
      color: '#333333',
      textAlign: 'left',
      padding: '16px'
    },
    canDelete: true,
    canDragable: true,
    isRequired: false
  },
  image: {
    type: EmailBlockType.IMAGE,
    content: {
      imageUrl: 'https://blog.adobe.com/en/publish/2024/10/14/media_1ca79b205381242c5f8beaaee2f0e1cfb2aa8f324.png?width=750&format=png&optimize=medium',
      altText: 'Image',
      linkUrl: '',
      caption: ''
    },
    styles: {
      width: '100%',
      padding: '0px',
      alignment: 'center'
    },
    canDelete: true,
    canDragable: true,
    isRequired: false
  },
  button: {
    type: EmailBlockType.BUTTON,
    content: {
      buttonText: 'Click Here',
      linkUrl: '#',
    },
    styles: {
      backgroundColor: '#007ace',
      textColor: '#ffffff',
      padding: '14px 32px',
      borderRadius: '6px',
      alignment: 'center'
    },
    canDelete: true,
    canDragable: true,
    isRequired: false
  },
  product: {
    type: EmailBlockType.PRODUCT,
    content: {
      products: [
        {
          id: 'sample-product',
          name: 'Sample Product',
          price: '$29.99',
          description: 'This is a sample product description.',
          imageUrl: '',
          productUrl: '#'
        }
      ],
      productLayout: 'single',
      showProductName: true,
      showProductPrice: true,
      showProductDescription: false,
      showCTAButton: true,
      buttonText: 'Buy Now'
    },
    styles: {
      backgroundColor: '#f9f9f9',
      border: '1px solid #e1e3e5',
      borderRadius: '8px',
      padding: '20px',
      margin: '0px',
      alignment: 'left'
    },
    canDelete: true,
    canDragable: true,
    isRequired: false
  },
  divider: {
    type: EmailBlockType.DIVIDER,
    content: {
      lineStyle: 'solid',
      lineColor: '#e1e3e5',
      lineHeight: '1px',
      width: '80%'
    },
    styles: {
      margin: '24px 0',
      padding: '0 24px'
    },
    canDelete: true,
    canDragable: true,
    isRequired: false
  },
  spacer: {
    type: EmailBlockType.SPACER,
    content: {
      height: '32px',
      backgroundColor: 'transparent'
    },
    styles: {},
    canDelete: true,
    canDragable: true,
    isRequired: false
  },
  footer: {
    type: EmailBlockType.FOOTER,
    content: {
      companyInfo: '© 2024 {{shop_name}}. All rights reserved.\n123 Business Street, City, State 12345',
      socialLinks: [],
      unsubscribeLink: 'https://{{shop_domain}}/unsubscribe',
      preferenceLink: '',
      backgroundColor: '#f6f6f7'
    },
    styles: {
      color: '#6d7175',
      fontSize: '14px',
      textAlign: 'center',
      padding: '24px'
    },
    canDelete: false,
    canDragable: false,
    isRequired: false,
    isUnique: true
  }
};