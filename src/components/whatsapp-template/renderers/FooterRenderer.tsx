import React from 'react';
import { Text } from '@shopify/polaris';
import { WhatsAppFooterBlock } from '../types';

interface FooterRendererProps {
  block: WhatsAppFooterBlock;
}

export const FooterRenderer: React.FC<FooterRendererProps> = ({ block }) => {
  return (
    <Text as="p" variant="bodySm" tone="subdued">
      {block.text || 'Footer text'}
    </Text>
  );
};
