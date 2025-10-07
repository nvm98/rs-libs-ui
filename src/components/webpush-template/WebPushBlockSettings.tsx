import React from 'react';
import { WebPushBlock } from './types';
import { TitleBlock } from './blocks/TitleBlock';
import { BodyBlock } from './blocks/BodyBlock';

interface WebPushBlockSettingsProps {
  block: WebPushBlock;
  onUpdate: (updates: Partial<WebPushBlock>) => void;
}

export const WebPushBlockSettings: React.FC<WebPushBlockSettingsProps> = ({ block, onUpdate }) => {
  const renderSettings = () => {
    switch (block.type) {
      case 'title':
        return <TitleBlock block={block} onUpdate={onUpdate} />;

      case 'body':
        return <BodyBlock block={block} onUpdate={onUpdate} />;

      default:
        return null;
    }
  };

  return renderSettings();
};
