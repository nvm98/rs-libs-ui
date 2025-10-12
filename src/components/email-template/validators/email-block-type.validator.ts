import { z } from 'zod';
import { EmailBlockType } from '../types/email-block-type.type';

export const EmailBlockTypeSchema = z.nativeEnum(EmailBlockType);

export const validateEmailBlockType = (value: unknown): value is EmailBlockType => {
  return EmailBlockTypeSchema.safeParse(value).success;
};
