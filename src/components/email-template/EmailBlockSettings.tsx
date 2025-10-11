import React from 'react';
import {
  HeaderBlockSettings,
  TextBlockSettings,
  ImageBlockSettings,
  ButtonBlockSettings,
  ProductBlockSettings,
  DividerBlockSettings,
  SpacerBlockSettings,
  FooterBlockSettings
} from './blocks';
import { EmailBlock } from './interfaces/email-block.interface';

interface EmailBlockSettingsProps {
  block: EmailBlock;
  onUpdate: (updates: Partial<EmailBlock>) => void;
}

export function EmailBlockSettings({ block, onUpdate }: EmailBlockSettingsProps) {
  const updateContent = (contentUpdates: any) => {
    onUpdate({
      ...block,
      content: { ...block.content, ...contentUpdates }
    });
  };

  const updateStyles = (styleUpdates: any) => {
    onUpdate({
      ...block,
      styles: { ...block.styles, ...styleUpdates }
    });
  };

  // Component mapping for cleaner organization
  const components = {
    header: HeaderBlockSettings,
    text: TextBlockSettings,
    image: ImageBlockSettings,
    button: ButtonBlockSettings,
    product: ProductBlockSettings,
    divider: DividerBlockSettings,
    spacer: SpacerBlockSettings,
    footer: FooterBlockSettings
  };

  const Component = components[block.type as keyof typeof components];
  
  if (!Component) {
    return null;
  }

  // All components now use both updateContent and updateStyles

  const FullComponent = Component as React.ComponentType<{
    block: EmailBlock;
    updateContent: (updates: any) => void;
    updateStyles: (updates: any) => void;
  }>;
  return <FullComponent block={block} updateContent={updateContent} updateStyles={updateStyles} />;
}
