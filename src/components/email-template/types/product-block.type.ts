import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type ProductLayoutType = 'single' | 'grid' | 'list';

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  productUrl: string;
}

export type ProductBlock = EmailBlock & {
  type: EmailBlockType.PRODUCT;
  content: {
    products: ProductItem[];
    productLayout: ProductLayoutType;
    showProductName: boolean;
    showProductPrice: boolean;
    showProductDescription: boolean;
    showCTAButton: boolean;
    buttonText: string;
  };
  styles: {
    backgroundColor: string;
    border: string;
    borderRadius: string;
    padding: string;
    margin: string;
    alignment: 'left' | 'center' | 'right';
  };
};
