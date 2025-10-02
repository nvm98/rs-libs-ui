import React from 'react';
import { WebPushBlock } from '../types';

interface TitleRendererProps {
  block: WebPushBlock;
  variables?: Record<string, string>;
}

export const TitleRenderer: React.FC<TitleRendererProps> = ({
  block,
  variables = {}
}) => {
  if (block.type !== 'title') {
    return <span>Invalid block type</span>;
  }

  // Replace variables in content
  let content = block.content;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    content = content.replace(regex, value);
  });

  return <span style={{ fontWeight: 'bold' }}>{content}</span>;
};
