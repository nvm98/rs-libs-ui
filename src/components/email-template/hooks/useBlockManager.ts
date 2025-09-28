import { useCallback } from 'react';
import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from '../types/email-block-type.type';
import { BLOCK_TEMPLATES } from '../constants/block.constant';

export function useBlockManager(
  blocks: EmailBlock[],
  onBlocksChange: (blocks: EmailBlock[]) => void
) {
  // Add new block
  const addBlock = useCallback((type: EmailBlockType, index?: number) => {
    const newBlock: EmailBlock = {
      id: Date.now().toString(),
      ...BLOCK_TEMPLATES[type]
    };

    const newBlocks = [...blocks];
    if (index !== undefined) {
      newBlocks.splice(index, 0, newBlock);
    } else {
      newBlocks.push(newBlock);
    }
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);

  // Remove block
  const removeBlock = useCallback((id: string) => {
    const newBlocks = blocks.filter(block => block.id !== id);
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);

  // Update block
  const updateBlock = useCallback((id: string, updates: Partial<EmailBlock>) => {
    const newBlocks = blocks.map(block =>
      block.id === id ? { ...block, ...updates } : block
    );
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);

  // Move block (for drag and drop)
  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);

  return {
    addBlock,
    removeBlock,
    updateBlock,
    moveBlock
  };
}
