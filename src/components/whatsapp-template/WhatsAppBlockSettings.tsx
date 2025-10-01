import { WhatsAppBlock, WhatsAppBlockType, WhatsAppHeaderBlock, WhatsAppBodyBlock, WhatsAppFooterBlock, WhatsAppButtonsBlock } from './types';
import { HeaderBlock } from './blocks/HeaderBlock';
import { BodyBlock } from './blocks/BodyBlock';
import { FooterBlock } from './blocks/FooterBlock';
import { ButtonsBlock } from './blocks/ButtonsBlock';

interface WhatsAppBlockSettingsProps {
  block: WhatsAppBlock;
  onUpdate: (updates: Partial<WhatsAppBlock>) => void;
}

export function WhatsAppBlockSettings({ block, onUpdate }: WhatsAppBlockSettingsProps) {
  // Don't render settings for blocks without content
  if (!block) {
    return null;
  }

  switch (block.type) {
    case WhatsAppBlockType.HEADER:
      return <HeaderBlock block={block as WhatsAppHeaderBlock} onUpdate={onUpdate} />;
    case WhatsAppBlockType.BODY:
      return <BodyBlock block={block as WhatsAppBodyBlock} onUpdate={onUpdate} />;
    case WhatsAppBlockType.FOOTER:
      return <FooterBlock block={block as WhatsAppFooterBlock} onUpdate={onUpdate} />;
    case WhatsAppBlockType.BUTTONS:
      return <ButtonsBlock block={block as WhatsAppButtonsBlock} onUpdate={onUpdate} />;
    default:
      return null;
  }
}
