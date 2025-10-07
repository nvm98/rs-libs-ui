import { useState } from 'react';
import { Icon, Text } from "@shopify/polaris";
import {
  ImageIcon,
  TextIcon,
  ButtonIcon,
  ProductIcon,
  MinusIcon,
  PlusCircleIcon
} from "@shopify/polaris-icons";
import { EmailBlockType } from '../types/email-block-type.type';
import { BLOCK_TEMPLATES } from '../constants/blocks.constant';

interface AddBlockZoneProps {
  position: number | 'top' | 'bottom';
  isDragOver?: boolean;
  isDragging?: boolean;
  onAddBlock: (type: EmailBlockType, index?: number) => void;
}

export function AddBlockZone({ position, onAddBlock, isDragOver = false, isDragging = false }: AddBlockZoneProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Block type icons
  const getBlockIcon = (type: EmailBlockType) => {
    const iconMap = {
      header: ImageIcon,
      text: TextIcon,
      image: ImageIcon,
      button: ButtonIcon,
      product: ProductIcon,
      divider: MinusIcon,
      spacer: PlusCircleIcon,
      footer: TextIcon
    };
    return iconMap[type];
  };

  // Block type labels
  const getBlockLabel = (type: EmailBlockType) => {
    const labelMap = {
      header: 'Header',
      text: 'Text',
      image: 'Image',
      button: 'Button',
      product: 'Product',
      divider: 'Divider',
      spacer: 'Spacer',
      footer: 'Footer'
    };
    return labelMap[type];
  };

  const handleAddBlock = (type: EmailBlockType) => {
    let index: number | undefined;
    
    if (position === 'top') {
      index = 0;
    } else if (typeof position === 'number') {
      index = position + 1;
    }
    // For 'bottom', index remains undefined (append to end)
    
    onAddBlock(type, index);
    setShowMenu(false);
  };

  const isActive = isHovered || isDragOver;

  // Hide add block zone when dragging
  if (isDragging) {
    return (
      <div
        data-add-block-zone
        style={{
          position: 'relative',
          height: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Background line - subtle when dragging */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          right: '20px',
          height: '1px',
          backgroundColor: '#e5e7eb',
          transform: 'translateY(-50%)',
          opacity: 0.2
        }} />
      </div>
    );
  }

  return (
    <div
      data-add-block-zone
      style={{
        position: 'relative',
        height: isActive ? '32px' : '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isActive ? 'pointer' : 'default',
        transition: 'height 0.2s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isActive && setShowMenu(!showMenu)}
    >
      {/* Background line - always visible but subtle */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '20px',
        right: '20px',
        height: '1px',
        backgroundColor: isActive ? '#007ace' : '#e5e7eb',
        transform: 'translateY(-50%)',
        transition: 'all 0.2s ease',
        opacity: isActive ? 0.6 : 0.3
      }} />

      {/* Plus button - only show when active */}
      {isActive && (
        <div style={{
          position: 'relative',
          width: '20px',
          height: '20px',
          backgroundColor: '#007ace',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0, 122, 206, 0.25)',
          transition: 'all 0.2s ease',
          zIndex: 10,
          border: '1.5px solid #ffffff'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 3px 10px rgba(0, 122, 206, 0.35)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 122, 206, 0.25)';
        }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M4 1V7M1 4H7" stroke="white" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>
      )}

      {/* Dropdown menu */}
      {showMenu && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          zIndex: 1000,
          marginTop: '8px',
          minWidth: '240px',
          padding: '8px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {Object.entries(BLOCK_TEMPLATES).map(([type]: [string, any]) => (
              <div
                key={type}
                onClick={() => handleAddBlock(type as EmailBlockType)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  color: '#007ace'
                }}>
                  <Icon source={getBlockIcon(type as EmailBlockType)} />
                </div>
                <Text as="span" variant="bodyMd" fontWeight="medium">
                  {getBlockLabel(type as EmailBlockType)}
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
