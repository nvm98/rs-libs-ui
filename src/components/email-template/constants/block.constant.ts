import { EmailBlock } from "../interfaces/email-block.interface";
import { EmailBlockType } from "../types";

export const initialBlocks: EmailBlock[] = [
    { 
      id: '1', 
      type: 'header', 
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
      id: '2', 
      type: 'text', 
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
      id: '3', 
      type: 'product', 
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
      id: '4', 
      type: 'button', 
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
      id: '5', 
      type: 'footer', 
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
    type: 'header',
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
    type: 'text',
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
    type: 'image',
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
    type: 'button',
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
    type: 'product',
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
    type: 'divider',
    content: {},
    styles: {
      borderColor: '#e1e3e5',
      margin: '24px 0'
    }
  },
  spacer: {
    type: 'spacer',
    content: {},
    styles: {
      height: '32px'
    }
  },
  footer: {
    type: 'footer',
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