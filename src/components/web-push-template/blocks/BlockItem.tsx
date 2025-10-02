import { useState } from 'react';
import { WebPushBlockSettings } from '../WebPushBlockSettings';
import { WebPushBlock } from '../types';
import { BlockItemHeader } from './BlockItemHeader';

interface BlockItemProps {
  block: WebPushBlock;
  isSelected: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onUpdate: (updates: Partial<WebPushBlock>) => void;
}

export function BlockItem({
  block,
  isSelected,
  onSelect,
  onToggleVisibility,
  onUpdate
}: BlockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: isHovered || isSelected ? 'solid #e1e3e5' : 'solid transparent',
        borderWidth: isHovered ? '1px 0 1px 0' : '1px',
        backgroundColor: isHovered || isSelected ? '#ffffff' : 'transparent',
        transition: 'all 0.15s ease',
        boxShadow: isSelected ? '0 2px 4px rgba(0,0,0,0.1)' :
                  isHovered ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
        marginBottom: '4px'
      }}
    >
      <BlockItemHeader
        block={block}
        isSelected={isSelected}
        isHovered={isHovered}
        onSelect={onSelect}
        onToggleVisibility={onToggleVisibility}
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
          <WebPushBlockSettings
            block={block}
            onUpdate={onUpdate}
          />
        </div>
      )}
    </div>
  );
}
