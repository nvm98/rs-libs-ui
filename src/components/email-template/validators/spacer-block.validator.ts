import { z } from 'zod';
import { EmailBlockType } from '../types/email-block-type.type';
import { SpacerBlock } from '../types/spacer-block.type';

const SpacerContentSchema = z.object({
  height: z.string().min(1, 'Height is required'),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a valid hex color'),
});

const SpacerStylesSchema = z.object({});

export const SpacerBlockSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  type: z.literal(EmailBlockType.SPACER),
  content: SpacerContentSchema,
  styles: SpacerStylesSchema,
  canDelete: z.boolean().optional(),
  canDragable: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  isUnique: z.boolean().optional(),
});

export const validateSpacerBlock = (value: unknown): value is SpacerBlock => {
  return SpacerBlockSchema.safeParse(value).success;
};

export const validateSpacerBlockWithErrors = (value: unknown) => {
  return SpacerBlockSchema.safeParse(value);
};
