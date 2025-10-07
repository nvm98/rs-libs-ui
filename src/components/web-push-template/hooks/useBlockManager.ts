import { useCallback } from 'react';
import { WebPushBlock, WebPushBlockType } from '../types';
import { Template } from '@shared/types';

export interface UseBlockManagerResult {
  updateBlock: (blockType: WebPushBlockType, updates: Partial<WebPushBlock>) => void;
}

export function useBlockManager(
  template: Template,
  onTemplateChange: (template: Template) => void
): UseBlockManagerResult {
  const updateBlock = useCallback((blockType: WebPushBlockType, updates: Partial<WebPushBlock>) => {
    const updatedBlocks = template.blocks.map(block =>
      block.type === blockType ? { ...block, ...updates } : block
    );
    onTemplateChange({ ...template, blocks: updatedBlocks });
  }, [template, onTemplateChange]);

  return {
    updateBlock
  };
}

// Keep the old hook for backward compatibility
export interface UseWebPushBlockManagerResult {
  blocks: WebPushBlock[];
  updateBlock: (blockId: string, content: string) => void;
  setBlocks: (blocks: WebPushBlock[]) => void;
  getBlockContent: (blockType: WebPushBlockType) => string;
  getTitleBlock: () => WebPushBlock | undefined;
  getBodyBlock: () => WebPushBlock | undefined;
}

export function useWebPushBlockManager(initialBlocks: WebPushBlock[] = []): UseWebPushBlockManagerResult {
  // This is kept for backward compatibility but not used in the new sidebar
  return {
    blocks: initialBlocks,
    updateBlock: () => {},
    setBlocks: () => {},
    getBlockContent: () => '',
    getTitleBlock: () => undefined,
    getBodyBlock: () => undefined
  };
}
