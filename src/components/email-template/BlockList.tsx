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
  const {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
  } = useDragAndDrop(blocks, onMoveBlock);

  // Close selected block when it's removed
  useEffect(() => {
    if (selectedBlockId && !blocks.find(block => block.id === selectedBlockId)) {
      onSelectedBlockChange(null);
    }
  }, [blocks, selectedBlockId, onSelectedBlockChange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Add Block Zone at top */}
      <AddBlockZone
        position="top"
        onAddBlock={onAddBlock}
        isDragOver={dragState.dragOverIndex === -1}
        isDragging={!!dragState.draggedBlockId}
      />

      {/* Existing Blocks */}
      {blocks.map((block, index) => (
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
            position={index}
            onAddBlock={onAddBlock}
            isDragOver={dragState.dragOverIndex === index + 1}
            isDragging={!!dragState.draggedBlockId}
          />
        </div>
      ))}

      {/* Add Block Zone at bottom */}
      <div
        onDragOver={(e) => handleDragOver(e, blocks.length)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, blocks.length)}
      >
        <AddBlockZone
          position="bottom"
          onAddBlock={onAddBlock}
          isDragOver={dragState.dragOverIndex === blocks.length}
          isDragging={!!dragState.draggedBlockId}
        />
      </div>
    </div>
  );
}
