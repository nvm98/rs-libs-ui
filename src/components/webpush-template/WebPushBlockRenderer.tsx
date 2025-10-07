import React from 'react';
import { WebPushBlock } from './types';
import { TitleRenderer, BodyRenderer } from './renderers';

interface WebPushBlockRendererProps {
  block: WebPushBlock;
  replaceVariables: (text: string) => string;
}

export const WebPushBlockRenderer: React.FC<WebPushBlockRendererProps> = ({
  block,
  replaceVariables
}) => {
  const renderBlock = () => {
    switch (block.type) {
      case 'title':
        return <TitleRenderer block={block} replaceVariables={replaceVariables} />;

      case 'body':
        return <BodyRenderer block={block} replaceVariables={replaceVariables} />;

      default:
        return <div>Unknown block type</div>;
    }
  };

  return <div>{renderBlock()}</div>;
};
