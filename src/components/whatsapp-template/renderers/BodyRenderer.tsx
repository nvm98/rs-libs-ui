import React from 'react';
import { Text } from '@shopify/polaris';
import { WhatsAppBodyBlock } from '../types';

interface BodyRendererProps {
  block: WhatsAppBodyBlock;
}

export const BodyRenderer: React.FC<BodyRendererProps> = ({ block }) => {
  const renderTextWithVariables = (text: string) => {
    const parts = text.split(/(\{\{.*?\}\})/g);
    return parts.map((part, index) => {
      if (part.match(/(\{\{.*?\}\})/g)) {
        return <b key={index}>{part}</b>;
      }
      return part;
    });
  };

  return (
    <Text as="p" variant="bodyMd">
      {renderTextWithVariables(block.text || 'Body text with {{variables}}')}
    </Text>
  );
};
