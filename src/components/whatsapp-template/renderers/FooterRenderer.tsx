import React from 'react';
import { Text } from '@shopify/polaris';
interface FooterRendererProps {
  block: {
    text: string;
  };
}

export const FooterRenderer: React.FC<FooterRendererProps> = ({ block }) => {
  return (
    <Text as="p" variant="bodySm" tone="subdued">
      {block.text || 'Footer text'}
    </Text>
  );
};
