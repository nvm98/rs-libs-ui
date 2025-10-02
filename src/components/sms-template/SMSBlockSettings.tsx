import React from 'react';
import { SMSBlock } from './types';
import { BodyBlock } from './blocks/BodyBlock';

interface SMSBlockSettingsProps {
  block: SMSBlock;
  onUpdate: (updates: Partial<SMSBlock>) => void;
}

export const SMSBlockSettings: React.FC<SMSBlockSettingsProps> = ({ block, onUpdate }) => {
  switch (block.type) {
    case 'body':
      return <BodyBlock block={block} onUpdate={onUpdate} />;
    default:
      return null;
  }
};
