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
  if (!isDragging) {
    return null;
  }

  return (
    <>
      <style>
        {`
          @keyframes dropZonePulse {
            0%, 100% {
              opacity: 0.8;
              transform: translate(-50%, -50%) scaleX(1);
            }
            50% {
              opacity: 1;
              transform: translate(-50%, -50%) scaleX(1.05);
            }
          }
        `}
      </style>
      <div
        onDragOver={(e) => onDragOver(e, index)}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, index)}
        style={{
          height: isDragOver ? '16px' : '4px',
          margin: '0 -24px',
          position: 'relative',
          backgroundColor: 'transparent',
          transition: 'height 0.2s ease-in-out'
        }}
      >
        {isDragOver && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #007ace 20%, #007ace 80%, transparent 100%)',
              borderRadius: '1px',
              boxShadow: '0 0 15px rgba(0, 122, 206, 0.5), 0 0 30px rgba(0, 122, 206, 0.2)',
              filter: 'blur(0.5px)',
              animation: 'dropZonePulse 1.5s ease-in-out infinite'
            }}
          />
        )}
      </div>
    </>
  );
}
