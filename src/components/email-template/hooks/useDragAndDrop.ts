import { useState, useCallback } from 'react';

interface DragState {
  draggedBlockId: string | null;
  dragOverIndex: number | null;
}

export function useDragAndDrop(
  blocks: any[],
  onMoveBlock: (fromIndex: number, toIndex: number) => void
) {
  const [dragState, setDragState] = useState<DragState>({
    draggedBlockId: null,
    dragOverIndex: null
  });

  // Drag start handler
  const handleDragStart = useCallback((e: React.DragEvent, blockId: string) => {
    setDragState(prev => ({ ...prev, draggedBlockId: blockId }));
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', blockId);
  }, []);

  // Drag over handler
  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragState(prev => ({ ...prev, dragOverIndex: index }));
  }, []);

  // Drag leave handler
  const handleDragLeave = useCallback(() => {
    setDragState(prev => ({ ...prev, dragOverIndex: null }));
  }, []);

  // Drop handler
  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');

    if (draggedId && draggedId !== dragState.draggedBlockId) return;

    const draggedIndex = blocks.findIndex(block => block.id === draggedId);
    if (draggedIndex === -1 || draggedIndex === dropIndex) return;

    onMoveBlock(draggedIndex, dropIndex);

    setDragState({
      draggedBlockId: null,
      dragOverIndex: null
    });
  }, [blocks, dragState.draggedBlockId, onMoveBlock]);

  // Drag end handler
  const handleDragEnd = useCallback(() => {
    setDragState({
      draggedBlockId: null,
      dragOverIndex: null
    });
  }, []);

  return {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
  };
}
