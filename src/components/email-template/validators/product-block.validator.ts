import { z } from 'zod';
import { EmailBlockType } from '../types/email-block-type.type';
import { ProductBlock, ProductItem, ProductLayoutType } from '../types/product-block.type';

const ProductLayoutTypeSchema = z.enum(['single', 'grid', 'list']);
const AlignmentSchema = z.enum(['left', 'center', 'right']);

const ProductItemSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product name is required'),
  price: z.string().min(1, 'Product price is required'),
  description: z.string().min(1, 'Product description is required'),
  imageUrl: z.string().url('Product image URL must be a valid URL'),
  productUrl: z.string().url('Product URL must be a valid URL'),
});

const ProductContentSchema = z.object({
  products: z.array(ProductItemSchema).min(1, 'At least one product is required'),
  productLayout: ProductLayoutTypeSchema,
  showProductName: z.boolean(),
  showProductPrice: z.boolean(),
  showProductDescription: z.boolean(),
  showCTAButton: z.boolean(),
  buttonText: z.string().min(1, 'Button text is required'),
});

const ProductStylesSchema = z.object({
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a valid hex color'),
  border: z.string().min(1, 'Border is required'),
  borderRadius: z.string().min(1, 'Border radius is required'),
  padding: z.string().min(1, 'Padding is required'),
  margin: z.string().min(1, 'Margin is required'),
  alignment: AlignmentSchema,
});

export const ProductBlockSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  type: z.literal(EmailBlockType.PRODUCT),
  content: ProductContentSchema,
  styles: ProductStylesSchema,
  canDelete: z.boolean().optional(),
  canDragable: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  isUnique: z.boolean().optional(),
});

export const ProductItemValidatorSchema = ProductItemSchema;
export const ProductLayoutTypeValidatorSchema = ProductLayoutTypeSchema;

export const validateProductBlock = (value: unknown): value is ProductBlock => {
  return ProductBlockSchema.safeParse(value).success;
};

export const validateProductItem = (value: unknown): value is ProductItem => {
  return ProductItemSchema.safeParse(value).success;
};

export const validateProductLayoutType = (value: unknown): value is ProductLayoutType => {
  return ProductLayoutTypeSchema.safeParse(value).success;
};

export const validateProductBlockWithErrors = (value: unknown) => {
  return ProductBlockSchema.safeParse(value);
};
