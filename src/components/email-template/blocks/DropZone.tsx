interface DropZoneProps {
  index: number;
  isDragOver: boolean;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}

export function DropZone({
  index,
  isDragOver,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop
}: DropZoneProps) {
  // Only show drop zone when dragging
  if (!isDragging) {
    return null;
  }

  return (
    <div
      onDragOver={(e) => onDragOver(e, index)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, index)}
      style={{
        height: '4px',
        backgroundColor: isDragOver ? '#007ace' : 'transparent',
        transition: 'background-color 0.2s ease'
      }}
    />
  );
}
