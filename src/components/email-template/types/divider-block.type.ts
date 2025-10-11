import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from './email-block-type.type';

export type LineStyleType = 'solid' | 'dashed' | 'dotted';

export type DividerBlock = EmailBlock & {
  type: EmailBlockType.DIVIDER;
  content: {
    lineStyle: LineStyleType;
    lineColor: string;
    lineHeight: string;
    width: string;
  };
  styles: {
    margin: string;
    padding: string;
  };
};
