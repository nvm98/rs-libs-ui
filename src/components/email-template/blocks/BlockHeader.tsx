import { Icon, Text } from "@shopify/polaris";
import {
  DragHandleIcon,
  DeleteIcon,
  ImageIcon,
  TextIcon,
  ButtonIcon,
  ProductIcon,
  MinusIcon,
  PlusCircleIcon
} from "@shopify/polaris-icons";
import { EmailBlockType } from "../types/email-block-type.type";
import { EmailBlock } from "../interfaces/email-block.interface";

interface BlockHeaderProps {
  block: EmailBlock;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function BlockHeader({
  block,
  isSelected,
  isHovered,
  onSelect,
  onRemove,
  onDragStart,
  onDragEnd,
  onMouseEnter,
  onMouseLeave
}: BlockHeaderProps) {
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

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={(e) => {
        // Don't trigger if clicking on drag handle or delete button
        if (!(e.target as Element).closest('[data-drag-handle]') &&
            !(e.target as Element).closest('[data-delete-button]')) {
          onSelect();
        }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget || (e.target as Element).closest('[data-drag-handle]')) {
          e.currentTarget.style.cursor = 'grabbing';
        }
      }}
      onMouseUp={(e) => {
        if ((e.target as Element).closest('[data-drag-handle]')) {
          e.currentTarget.style.cursor = 'grab';
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        cursor: isSelected ? 'default' : 'pointer',
        backgroundColor: isSelected ? '#f8f9fa' :
                        isHovered ? '#f9fafb' : 'transparent',
        transition: 'background-color 0.15s ease'
      }}
    >
      {/* Left side: Drag handle + Icon + Text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div data-drag-handle style={{ cursor: 'grab' }}>
          <Icon source={DragHandleIcon} />
        </div>
        <Icon source={getBlockIcon(block.type)} />
        <Text as="span" variant="bodySm" fontWeight={isSelected ? 'medium' : 'regular'}>
          {getBlockLabel(block.type)}
        </Text>
      </div>

      {/* Right side: Delete button on hover */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isSelected && (
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            Click to collapse
          </div>
        )}
        {/* Always reserve space for delete button to prevent layout shift */}
        <div
          data-delete-button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            cursor: isHovered ? 'pointer' : 'default',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.15s ease'
          }}
        >
          <Icon source={DeleteIcon} tone="base" />
        </div>
      </div>
    </div>
  );
}
