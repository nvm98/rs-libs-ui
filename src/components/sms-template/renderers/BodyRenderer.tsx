import React from 'react';
import { SMSBlock } from '../types';

interface BodyRendererProps {
  block: SMSBlock;
  variables?: Record<string, string>;
}

export const BodyRenderer: React.FC<BodyRendererProps> = ({
  block,
  variables = {}
}) => {
  if (block.type !== 'body') {
    return <span>Invalid block type</span>;
  }

  // Replace variables in content
  let content = block.content;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    content = content.replace(regex, value);
  });

  return <span>{content}</span>;
};
