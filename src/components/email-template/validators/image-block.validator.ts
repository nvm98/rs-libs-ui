import { z } from 'zod';
import { EmailBlockType } from '../types/email-block-type.type';
import { ImageBlock } from '../types/image-block.type';

const AlignmentSchema = z.enum(['left', 'center', 'right']);

const ImageContentSchema = z.object({
  imageUrl: z.string().url('Image URL must be a valid URL'),
  altText: z.string().min(1, 'Alt text is required'),
  linkUrl: z.string().url('Link URL must be a valid URL'),
  caption: z.string().min(1, 'Caption is required'),
});

const ImageStylesSchema = z.object({
  width: z.string().min(1, 'Width is required'),
  alignment: AlignmentSchema,
  padding: z.string().min(1, 'Padding is required'),
});

export const ImageBlockSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  type: z.literal(EmailBlockType.IMAGE),
  content: ImageContentSchema,
  styles: ImageStylesSchema,
  canDelete: z.boolean().optional(),
  canDragable: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  isUnique: z.boolean().optional(),
});

export const validateImageBlock = (value: unknown): value is ImageBlock => {
  return ImageBlockSchema.safeParse(value).success;
};

export const validateImageBlockWithErrors = (value: unknown) => {
  return ImageBlockSchema.safeParse(value);
};
