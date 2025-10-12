import { z } from 'zod';
import { EmailBlockType } from '../types/email-block-type.type';
import { ButtonBlock } from '../types/button-block.type';

const AlignmentSchema = z.enum(['left', 'center', 'right']);

const ButtonContentSchema = z.object({
  buttonText: z.string().min(1, 'Button text is required'),
  linkUrl: z.string().url('Link URL must be a valid URL'),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a valid hex color'),
  textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Text color must be a valid hex color'),
  padding: z.string().min(1, 'Padding is required'),
  borderRadius: z.string().min(1, 'Border radius is required'),
  alignment: AlignmentSchema,
});

const ButtonStylesSchema = z.object({});

export const ButtonBlockSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  type: z.literal(EmailBlockType.BUTTON),
  content: ButtonContentSchema,
  styles: ButtonStylesSchema,
  canDelete: z.boolean().optional(),
  canDragable: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  isUnique: z.boolean().optional(),
});

export const validateButtonBlock = (value: unknown): value is ButtonBlock => {
  return ButtonBlockSchema.safeParse(value).success;
};

export const validateButtonBlockWithErrors = (value: unknown) => {
  return ButtonBlockSchema.safeParse(value);
};
