import { z } from 'zod';
import { EmailBlockType } from '../types/email-block-type.type';
import { FooterBlock, SocialLink } from '../types/footer-block.type';

const AlignmentSchema = z.enum(['left', 'center', 'right']);

const SocialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('URL must be a valid URL'),
  icon: z.string().optional(),
});

const FooterContentSchema = z.object({
  companyInfo: z.string().min(1, 'Company info is required'),
  socialLinks: z.array(SocialLinkSchema),
  unsubscribeLink: z.string().url('Unsubscribe link must be a valid URL'),
  preferenceLink: z.string().url('Preference link must be a valid URL'),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a valid hex color'),
});

const FooterStylesSchema = z.object({
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color'),
  fontSize: z.string().min(1, 'Font size is required'),
  textAlign: AlignmentSchema,
  padding: z.string().min(1, 'Padding is required'),
});

export const FooterBlockSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  type: z.literal(EmailBlockType.FOOTER),
  content: FooterContentSchema,
  styles: FooterStylesSchema,
  canDelete: z.boolean().optional(),
  canDragable: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  isUnique: z.boolean().optional(),
});

export const SocialLinkValidatorSchema = SocialLinkSchema;

export const validateFooterBlock = (value: unknown): value is FooterBlock => {
  return FooterBlockSchema.safeParse(value).success;
};

export const validateSocialLink = (value: unknown): value is SocialLink => {
  return SocialLinkSchema.safeParse(value).success;
};

export const validateFooterBlockWithErrors = (value: unknown) => {
  return FooterBlockSchema.safeParse(value);
};
