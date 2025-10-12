import { z } from 'zod';
import { EmailBlockType } from '../types/email-block-type.type';
import { TextBlock } from '../types/text-block.type';

const AlignmentSchema = z.enum(['left', 'center', 'right']);

const TextContentSchema = z.object({
  text: z.string().min(1, 'Text content is required'),
});

const TextStylesSchema = z.object({
  fontSize: z.string().min(1, 'Font size is required'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color'),
  textAlign: AlignmentSchema,
  padding: z.string().min(1, 'Padding is required'),
});

export const TextBlockSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  type: z.literal(EmailBlockType.TEXT),
  content: TextContentSchema,
  styles: TextStylesSchema,
  canDelete: z.boolean().optional(),
  canDragable: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  isUnique: z.boolean().optional(),
});

export const validateTextBlock = (value: unknown): value is TextBlock => {
  return TextBlockSchema.safeParse(value).success;
};

export const validateTextBlockWithErrors = (value: unknown) => {
  return TextBlockSchema.safeParse(value);
};
