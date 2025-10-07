import { useCallback } from 'react';
import { SMSBlock } from '../types';
import { Template } from '@shared/types';

export function useBlockManager (
  template: Template,
  onTemplateChange: (template: Template) => void
) {
  const updateBlock = useCallback((blockType: string, updates: Partial<SMSBlock>) => {
    const updatedBlocks = template.blocks.map(block =>
      block.type === blockType ? { ...block, ...updates } : block
    );
    
    onTemplateChange({
      ...template,
      blocks: updatedBlocks
    });
  }, [template, onTemplateChange]);

  return {
    updateBlock
  };
};
