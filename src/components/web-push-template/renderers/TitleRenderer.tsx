import React from 'react';
import { WebPushBlock } from '../types';

interface TitleRendererProps {
  block: WebPushBlock;
  replaceVariables: (text: string) => string;
}

export const TitleRenderer: React.FC<TitleRendererProps> = ({
  block,
  replaceVariables
}) => {
  if (block.type !== 'title') {
    return <span>Invalid block type</span>;
  }

  return <span style={{ fontWeight: 'bold' }}>{replaceVariables(block.content)}</span>;
};
