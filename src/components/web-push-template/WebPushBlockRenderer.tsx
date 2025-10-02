import React from 'react';
import { WebPushBlock } from './types';
import { TitleRenderer, BodyRenderer } from './renderers';

interface WebPushBlockRendererProps {
  block: WebPushBlock;
  variables?: Record<string, string>;
}

export const WebPushBlockRenderer: React.FC<WebPushBlockRendererProps> = ({
  block,
  variables = {}
}) => {
  const renderBlock = () => {
    switch (block.type) {
      case 'title':
        return <TitleRenderer block={block} variables={variables} />;

      case 'body':
        return <BodyRenderer block={block} variables={variables} />;

      default:
        return <div>Unknown block type</div>;
    }
  };

  return <div>{renderBlock()}</div>;
};
