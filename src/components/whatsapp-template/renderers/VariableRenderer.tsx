import React from 'react';
import { BlockStack, Text, Badge } from '@shopify/polaris';
import { WhatsAppVariableBlock } from '../types';

interface VariableRendererProps {
  block: WhatsAppVariableBlock;
}

export const VariableRenderer: React.FC<VariableRendererProps> = ({ block }) => {
  return (
    <BlockStack gap="200">
      <Badge tone="info">
        {`Variable: ${block.variable_name || 'unnamed'}`}
      </Badge>
      {block.default_value && (
        <Text as="p" variant="bodySm" tone="subdued">
          Default: {block.default_value}
        </Text>
      )}
    </BlockStack>
  );
};
