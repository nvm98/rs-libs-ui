import { useEffect } from 'react';
import { AddBlockZone } from './blocks/AddBlockZone';
import { DropZone } from './blocks/DropZone';
import { BlockItem } from './blocks/BlockItem';
import { EmailBlock } from './interfaces/email-block.interface';
import { EmailBlockType } from './types/email-block-type.type';
import { useDragAndDrop } from './hooks/useDragAndDrop';

interface BlockListProps {
  blocks: EmailBlock[];
  selectedBlockId: string | null;
  onSelectedBlockChange: (id: string | null) => void;
  onAddBlock: (type: EmailBlockType, index?: number) => void;
  onRemoveBlock: (id: string) => void;
  onUpdateBlock: (id: string, updates: Partial<EmailBlock>) => void;
  onMoveBlock: (fromIndex: number, toIndex: number) => void;
}

export function BlockList({
  blocks,
  selectedBlockId,
  onSelectedBlockChange,
  onAddBlock,
  onRemoveBlock,
  onUpdateBlock,
  onMoveBlock
}: BlockListProps) {
  // Filter out subject and footer blocks from drag and drop operations
  const regularBlocks = blocks.filter(block => block.type !== 'subject' && block.type !== 'footer');
  const subjectBlock = blocks.find(block => block.type === 'subject');
  const footerBlock = blocks.find(block => block.type === 'footer');

  const {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
  } = useDragAndDrop(regularBlocks, (fromIndex: number, toIndex: number) => {
    // Adjust indices to account for subject block at position 0
    const adjustedFromIndex = subjectBlock ? fromIndex + 1 : fromIndex;
    const adjustedToIndex = subjectBlock ? toIndex + 1 : toIndex;
    onMoveBlock(adjustedFromIndex, adjustedToIndex);
  });

  // Close selected block when it's removed
  useEffect(() => {
    if (selectedBlockId && !blocks.find(block => block.id === selectedBlockId)) {
      onSelectedBlockChange(null);
    }
  }, [blocks, selectedBlockId, onSelectedBlockChange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Subject Block - Always at top, no drag zones around it */}
      {subjectBlock && (
        <BlockItem
          block={subjectBlock}
          isSelected={selectedBlockId === subjectBlock.id}
          isDragging={false}
          onSelect={() => onSelectedBlockChange(selectedBlockId === subjectBlock.id ? null : subjectBlock.id)}
          onRemove={() => {}} // No-op for subject block
          onUpdate={(updates) => onUpdateBlock(subjectBlock.id, updates)}
          onDragStart={() => {}} // No-op for subject block
          onDragEnd={() => {}} // No-op for subject block
        />
      )}

      {/* Add Block Zone at top (after subject) */}
      <AddBlockZone
        position="top"
        onAddBlock={onAddBlock}
        isDragOver={dragState.dragOverIndex === -1}
        isDragging={!!dragState.draggedBlockId}
        blocks={blocks}
      />

      {/* Regular Blocks (excluding subject and footer) */}
      {regularBlocks.map((block, index) => {
        const actualIndex = subjectBlock ? index + 1 : index;
        return (
          <div key={block.id}>
            {/* Drop zone above block */}
            <DropZone
              index={index}
              isDragOver={dragState.dragOverIndex === index}
              isDragging={!!dragState.draggedBlockId}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            <BlockItem
              block={block}
              isSelected={selectedBlockId === block.id}
              isDragging={dragState.draggedBlockId === block.id}
              onSelect={() => onSelectedBlockChange(selectedBlockId === block.id ? null : block.id)}
              onRemove={() => onRemoveBlock(block.id)}
              onUpdate={(updates) => onUpdateBlock(block.id, updates)}
              onDragStart={(e) => handleDragStart(e, block.id)}
              onDragEnd={handleDragEnd}
            />

            {/* Add Block Zone between blocks */}
            <AddBlockZone
              position={actualIndex}
              onAddBlock={onAddBlock}
              isDragOver={dragState.dragOverIndex === index + 1}
              isDragging={!!dragState.draggedBlockId}
              blocks={blocks}
            />
          </div>
        );
      })}

      {/* Drop zone after last regular block */}
      <DropZone
        index={regularBlocks.length}
        isDragOver={dragState.dragOverIndex === regularBlocks.length}
        isDragging={!!dragState.draggedBlockId}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />

      {/* Add Block Zone before footer */}
      <AddBlockZone
        position="bottom"
        onAddBlock={onAddBlock}
        isDragOver={dragState.dragOverIndex === regularBlocks.length}
        isDragging={!!dragState.draggedBlockId}
        blocks={blocks}
      />

      {/* Footer Block - Always at bottom, no drag zones around it */}
      {footerBlock && (
        <BlockItem
          block={footerBlock}
          isSelected={selectedBlockId === footerBlock.id}
          isDragging={false}
          onSelect={() => onSelectedBlockChange(selectedBlockId === footerBlock.id ? null : footerBlock.id)}
          onRemove={() => {}} // No-op for footer block
          onUpdate={(updates) => onUpdateBlock(footerBlock.id, updates)}
          onDragStart={() => {}} // No-op for footer block
          onDragEnd={() => {}} // No-op for footer block
        />
      )}
    </div>
  );
}
