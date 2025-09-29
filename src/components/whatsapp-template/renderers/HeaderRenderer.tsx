import React from 'react';
import { BlockStack, Text } from '@shopify/polaris';
import { WhatsAppHeaderBlock } from '../types';

interface HeaderRendererProps {
  block: WhatsAppHeaderBlock;
}

export const HeaderRenderer: React.FC<HeaderRendererProps> = ({ block }) => {
  if (block.format === 'TEXT') {
    return (
      <Text as="h2" variant="headingMd" fontWeight="bold">
        {block.text || 'Header Text'}
      </Text>
    );
  }

  if (['IMAGE', 'VIDEO', 'DOCUMENT'].includes(block.format || '') && block.media_url) {
    return (
      <BlockStack gap="200">
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#f0f0f0', 
          textAlign: 'center',
          borderRadius: '8px'
        }}>
          [ {block.format} Preview ]
        </div>
        {block.text && (
          <Text as="p" variant="bodyMd" fontWeight="medium">
            {block.text}
          </Text>
        )}
      </BlockStack>
    );
  }

  return (
    <Text as="h2" variant="headingMd" fontWeight="bold">
      Header
    </Text>
  );
};
