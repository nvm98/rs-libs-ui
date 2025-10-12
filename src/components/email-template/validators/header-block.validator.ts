import { z } from 'zod';
import { EmailBlockType } from '../types/email-block-type.type';
import { HeaderBlock } from '../types/header-block.type';

const AlignmentSchema = z.enum(['left', 'center', 'right']);

const HeaderContentSchema = z.object({
  logoUrl: z.string().url('Logo URL must be a valid URL'),
  logoAltText: z.string().min(1, 'Logo alt text is required'),
  logoLinkUrl: z.string().url('Logo link URL must be a valid URL'),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a valid hex color'),
  showWebViewLink: z.boolean(),
  alignment: AlignmentSchema,
});

const HeaderStylesSchema = z.object({
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a valid hex color'),
  padding: z.string().min(1, 'Padding is required'),
  textAlign: AlignmentSchema,
  logoStyles: z.object({
    width: z.string().optional(),
    borderRadius: z.string().optional(),
    padding: z.string().optional(),
  }),
});

export const HeaderBlockSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  type: z.literal(EmailBlockType.HEADER),
  content: HeaderContentSchema,
  styles: HeaderStylesSchema,
  canDelete: z.boolean().optional(),
  canDragable: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  isUnique: z.boolean().optional(),
});

export const validateHeaderBlock = (value: unknown): value is HeaderBlock => {
  return HeaderBlockSchema.safeParse(value).success;
};

export const validateHeaderBlockWithErrors = (value: unknown) => {
  return HeaderBlockSchema.safeParse(value);
};
