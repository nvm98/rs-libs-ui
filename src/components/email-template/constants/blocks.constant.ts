import { EmailBlock } from "../interfaces/email-block.interface";
import { EmailBlockType } from "../types";

export const INITIAL_BLOCKS: EmailBlock[] = [
    {
      id: 'header-1',
      type: EmailBlockType.HEADER,
      content: {
        logoUrl: '{{shop_logo_url}}',
        logoAltText: '{{shop_name}}',
        logoLinkUrl: '{{shop_url}}',
        showWebViewLink: true,
        alignment: 'center'
      },
      styles: {
        backgroundColor: '#ffffff',
        padding: '32px 24px',
        logoStyles: {
          width: 'auto',
          borderRadius: '0px',
          padding: '0'
        }
      }
    },
    { 
      id: 'text-2', 
      type: EmailBlockType.TEXT, 
      content: { 
        text: 'Hi {{customer_first_name}}, your order is ready!', 
        variables: true 
      }, 
      styles: { 
        fontSize: '16px', 
        color: '#333333', 
        textAlign: 'left', 
        padding: '16px 24px' 
      } 
    },
    {
      id: 'image-3',
      type: EmailBlockType.IMAGE,
      content: {
        imageUrl: 'https://blog.adobe.com/en/publish/2024/10/14/media_1ca79b205381242c5f8beaaee2f0e1cfb2aa8f324.png?width=750&format=png&optimize=medium',
        altText: 'A descriptive image',
        linkUrl: '',
        caption: 'This is an optional caption for the image.'
      },
      styles: {
        width: '100%',
        padding: '16px 24px',
        alignment: 'center'
      }
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
          {
            id: 'product-2',
            name: '{{product_title}}',
            price: '{{product_price}}',
            description: '{{product_description}}',
            imageUrl: '{{product_image_url}}',
            productUrl: '{{product_url}}'
          },
          {
            id: 'product-3',
            name: '{{product_title}}',
            price: '{{product_price}}',
            description: '{{product_description}}',
            imageUrl: '{{product_image_url}}',
            productUrl: '{{product_url}}'
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
        margin: '16px 24px',
        alignment: 'left'
      }
    },
    {
      id: 'button-5',
      type: EmailBlockType.BUTTON,
      content: {
        buttonText: 'Shop Now',
        linkUrl: '{{shop_url}}',
        backgroundColor: '#007ace',
        textColor: '#ffffff',
        padding: '14px 32px',
        borderRadius: '6px',
        alignment: 'center'
      },
      styles: {}
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
      }
    }
  ];

  export const BLOCK_TEMPLATES: Record<EmailBlockType, Omit<EmailBlock, 'id'>> = {
  header: {
    type: EmailBlockType.HEADER,
    content: {
      logoUrl: '{{shop_logo_url}}',
      logoAltText: '{{shop_name}}',
      logoLinkUrl: '{{shop_url}}',
      showWebViewLink: true,
      alignment: 'center'
    },
    styles: {
      backgroundColor: '#ffffff',
      padding: '32px 24px',
      logoStyles: {
        width: 'auto',
        borderRadius: '0px',
        padding: '0'
      }
    }
  },
  text: {
    type: EmailBlockType.TEXT,
    content: {
      text: 'Your text content here...',
      variables: true
    },
    styles: {
      fontSize: '16px',
      color: '#333333',
      textAlign: 'left',
      padding: '16px 24px'
    }
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
      padding: '16px 24px',
      alignment: 'center'
    }
  },
  button: {
    type: EmailBlockType.BUTTON,
    content: {
      buttonText: 'Click Here',
      linkUrl: '#',
      backgroundColor: '#007ace',
      textColor: '#ffffff',
      padding: '14px 32px',
      borderRadius: '6px',
      alignment: 'center'
    },
    styles: {}
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
      margin: '16px 24px',
      alignment: 'left'
    }
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
    }
  },
  spacer: {
    type: EmailBlockType.SPACER,
    content: {
      height: '32px',
      backgroundColor: 'transparent'
    },
    styles: {}
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
    }
  }
};