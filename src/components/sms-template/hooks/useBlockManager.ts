import { useCallback } from 'react';
import { SMSTemplate, SMSBlock } from '../types';

export function useBlockManager (
  template: SMSTemplate,
  onTemplateChange: (template: SMSTemplate) => void
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
