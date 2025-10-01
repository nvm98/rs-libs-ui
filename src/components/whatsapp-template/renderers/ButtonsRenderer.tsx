import React from 'react';
import { InlineStack, Button } from '@shopify/polaris';
import { WhatsAppButton } from '../types';

interface ButtonsRendererProps {
  block: {
    buttons: WhatsAppButton[];
  };
}

export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({ block }) => {
  if (!block.buttons || block.buttons.length === 0) {
    return null;
  }

  return (
    <InlineStack gap="200" align="center">
      {block.buttons.map((button, index) => (
        <Button key={index} size="slim" variant="secondary">
          {button.text}
        </Button>
      ))}
    </InlineStack>
  );
};
