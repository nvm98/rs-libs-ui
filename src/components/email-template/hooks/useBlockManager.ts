import { useCallback, useState, useEffect } from 'react';
import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from '../types/email-block-type.type';
import { BLOCK_TEMPLATES } from '../constants/block.constant';

export function useBlockManager(
  initialBlocks: EmailBlock[] | undefined,
  onBlocksChange: (blocks: EmailBlock[]) => void
) {
  const [blocks, setBlocks] = useState(initialBlocks || []);

  useEffect(() => {
    setBlocks(initialBlocks || []);
  }, [initialBlocks]);
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

    setBlocks(newBlocks);
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);

  // Remove block
  const removeBlock = useCallback((id: string) => {
    const newBlocks = blocks.filter((block: EmailBlock) => block.id !== id);
    setBlocks(newBlocks);
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);

  // Update block
  const updateBlock = useCallback((id: string, updates: Partial<EmailBlock>) => {
    const newBlocks = blocks.map((block: EmailBlock) =>
      block.id === id ? { ...block, ...updates } : block
    );
    setBlocks(newBlocks);
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);

  // Move block (for drag and drop)
  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(newBlocks);
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);

  return {
    addBlock,
    removeBlock,
    updateBlock,
    moveBlock
  };
}
