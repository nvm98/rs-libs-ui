import React from 'react';
import { BlockStack, Text } from '@shopify/polaris';
import { WhatsAppMediaBlock } from '../types';

interface MediaRendererProps {
  block: WhatsAppMediaBlock;
}

export const MediaRenderer: React.FC<MediaRendererProps> = ({ block }) => {
  return (
    <BlockStack gap="200">
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        textAlign: 'center',
        borderRadius: '8px',
        border: '2px dashed #ccc'
      }}>
        <Text as="p" variant="bodyMd" fontWeight="medium">
          {block.media_type || 'IMAGE'} Media
        </Text>
        {block.media_url && (
          <Text as="p" variant="bodySm" tone="subdued">
            {block.media_url}
          </Text>
        )}
      </div>
      {block.caption && (
        <Text as="p" variant="bodyMd">
          {block.caption}
        </Text>
      )}
    </BlockStack>
  );
};
