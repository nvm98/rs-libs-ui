import React from 'react';
import { WebPushBlock } from '../types';

interface BodyRendererProps {
  block: WebPushBlock;
  replaceVariables: (text: string) => string;
}

export const BodyRenderer: React.FC<BodyRendererProps> = ({
  block,
  replaceVariables
}) => {
  if (block.type !== 'body') {
    return <span>Invalid block type</span>;
  }

  return <span>{replaceVariables(block.content)}</span>;
};
