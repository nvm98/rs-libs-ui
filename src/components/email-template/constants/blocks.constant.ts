import { EmailBlock } from "../interfaces/email-block.interface";
import { EmailBlockType } from "../types";

export const INITIAL_BLOCKS: EmailBlock[] = [
    { 
      id: 'header-1', 
      type: EmailBlockType.HEADER, 
      content: { 
        logoUrl: '{{shop_logo_url}}', 
        shopName: '{{shop_name}}', 
        showLogo: true, 
        alignment: 'center' 
      }, 
      styles: { 
        backgroundColor: '#ffffff', 
        padding: '32px 24px', 
        textAlign: 'center' 
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
      id: 'product-3', 
      type: EmailBlockType.PRODUCT, 
      content: { 
        showImage: true, 
        showPrice: true, 
        showDescription: false 
      }, 
      styles: { 
        backgroundColor: '#f9f9f9', 
        border: '1px solid #e1e3e5', 
        borderRadius: '8px', 
        padding: '20px', 
        margin: '16px 24px' 
      } 
    },
    { 
      id: 'button-4', 
      type: EmailBlockType.BUTTON, 
      content: { 
        text: 'Shop Now', 
        link: '{{shop_url}}', 
        variables: true 
      }, 
      styles: { 
        backgroundColor: '#007ace', 
        color: '#ffffff', 
        padding: '14px 32px', 
        borderRadius: '6px', 
        textAlign: 'center', 
        margin: '16px 24px' 
      } 
    },
    { 
      id: 'footer-5', 
      type: EmailBlockType.FOOTER, 
      content: { 
        text: '© 2024 {{shop_name}}. All rights reserved.', 
        unsubscribeText: 'Unsubscribe from these notifications', 
        showSocial: false 
      }, 
      styles: { 
        backgroundColor: '#f6f6f7', 
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
      shopName: '{{shop_name}}',
      showLogo: true,
      alignment: 'center'
    },
    styles: {
      backgroundColor: '#ffffff',
      padding: '32px 24px',
      textAlign: 'center'
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
      src: 'https://via.placeholder.com/600x200',
      alt: 'Image',
      link: ''
    },
    styles: {
      width: '100%',
      maxWidth: '600px',
      padding: '16px 24px',
      textAlign: 'center'
    }
  },
  button: {
    type: EmailBlockType.BUTTON,
    content: {
      text: 'Click Here',
      link: '#',
      variables: true
    },
    styles: {
      backgroundColor: '#007ace',
      color: '#ffffff',
      padding: '14px 32px',
      borderRadius: '6px',
      textAlign: 'center',
      margin: '16px 24px'
    }
  },
  product: {
    type: EmailBlockType.PRODUCT,
    content: {
      showImage: true,
      showPrice: true,
      showDescription: false
    },
    styles: {
      backgroundColor: '#f9f9f9',
      border: '1px solid #e1e3e5',
      borderRadius: '8px',
      padding: '20px',
      margin: '16px 24px'
    }
  },
  divider: {
    type: EmailBlockType.DIVIDER,
    content: {},
    styles: {
      borderColor: '#e1e3e5',
      margin: '24px 0'
    }
  },
  spacer: {
    type: EmailBlockType.SPACER,
    content: {},
    styles: {
      height: '32px'
    }
  },
  footer: {
    type: EmailBlockType.FOOTER,
    content: {
      text: '© 2024 {{shop_name}}. All rights reserved.',
      unsubscribeText: 'Unsubscribe from these notifications',
      showSocial: false
    },
    styles: {
      backgroundColor: '#f6f6f7',
      color: '#6d7175',
      fontSize: '14px',
      textAlign: 'center',
      padding: '24px'
    }
  }
};