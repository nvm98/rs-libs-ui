import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type ProductBlock = EmailBlock & {
  type: EmailBlockType.PRODUCT;
  content: {
    showImage: boolean;
    showPrice: boolean;
    showDescription: boolean;
  };
  styles: {
    backgroundColor: string;
    border: string;
    borderRadius: string;
    padding: string;
    margin: string;
  };
};
