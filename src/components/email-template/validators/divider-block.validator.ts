import { z } from 'zod';
import { EmailBlockType } from '../types/email-block-type.type';
import { DividerBlock, LineStyleType } from '../types/divider-block.type';

const LineStyleTypeSchema = z.enum(['solid', 'dashed', 'dotted']);

const DividerContentSchema = z.object({
  lineStyle: LineStyleTypeSchema,
  lineColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Line color must be a valid hex color'),
  lineHeight: z.string().min(1, 'Line height is required'),
  width: z.string().min(1, 'Width is required'),
});

const DividerStylesSchema = z.object({
  margin: z.string().min(1, 'Margin is required'),
  padding: z.string().min(1, 'Padding is required'),
});

export const DividerBlockSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  type: z.literal(EmailBlockType.DIVIDER),
  content: DividerContentSchema,
  styles: DividerStylesSchema,
  canDelete: z.boolean().optional(),
  canDragable: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  isUnique: z.boolean().optional(),
});

export const LineStyleTypeValidatorSchema = LineStyleTypeSchema;

export const validateDividerBlock = (value: unknown): value is DividerBlock => {
  return DividerBlockSchema.safeParse(value).success;
};

export const validateLineStyleType = (value: unknown): value is LineStyleType => {
  return LineStyleTypeSchema.safeParse(value).success;
};

export const validateDividerBlockWithErrors = (value: unknown) => {
  return DividerBlockSchema.safeParse(value);
};
