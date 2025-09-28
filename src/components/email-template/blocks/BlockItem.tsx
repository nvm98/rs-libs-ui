import { useState } from 'react';
import { BlockHeader } from './BlockHeader';
import { EmailBlockSettings } from '../EmailBlockSettings';
import { EmailBlock } from '../interfaces/email-block.interface';

interface BlockItemProps {
  block: EmailBlock;
  isSelected: boolean;
  isDragging: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onUpdate: (updates: Partial<EmailBlock>) => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

export function BlockItem({
  block,
  isSelected,
  isDragging,
  onSelect,
  onRemove,
  onUpdate,
  onDragStart,
  onDragEnd
}: BlockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        opacity: isDragging ? 0.5 : 1,
        border: isHovered || isSelected ? 'solid #e1e3e5' : 'solid transparent',
        borderWidth: isHovered ? '1px 0 1px 0' : '1px',
        backgroundColor: isHovered || isSelected ? '#ffffff' : 'transparent',
        transition: 'all 0.15s ease',
        boxShadow: isSelected ? '0 2px 4px rgba(0,0,0,0.1)' :
                  isHovered ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      <BlockHeader
        block={block}
        isSelected={isSelected}
        isHovered={isHovered}
        onSelect={onSelect}
        onRemove={onRemove}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Inline Block Settings */}
      {isSelected && (
        <div
          style={{
            borderTop: '1px solid #e1e3e5',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '0 0 8px 8px'
          }}
        >
          <EmailBlockSettings
            block={block}
            onUpdate={onUpdate}
          />
        </div>
      )}
    </div>
  );
}
