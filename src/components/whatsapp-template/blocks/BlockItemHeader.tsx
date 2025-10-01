import { Icon, Text } from "@shopify/polaris";
import {
  ViewIcon,
  HideIcon,
  TextIcon,
  ButtonIcon,
  EmailIcon,
  LayoutHeaderIcon,
  LayoutFooterIcon
} from "@shopify/polaris-icons";
import { WhatsAppBlockType } from "../types";
import { WhatsAppBlock } from "../types";

interface BlockItemHeaderProps {
  block: WhatsAppBlock;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function BlockItemHeader({
  block,
  isSelected,
  isHovered,
  onSelect,
  onToggleVisibility,
  onMouseEnter,
  onMouseLeave
}: BlockItemHeaderProps) {
  // Block type icons
  const getBlockIcon = (type: WhatsAppBlockType) => {
    const iconMap = {
      [WhatsAppBlockType.HEADER]: LayoutHeaderIcon,
      [WhatsAppBlockType.BODY]: TextIcon,
      [WhatsAppBlockType.FOOTER]: LayoutFooterIcon,
      [WhatsAppBlockType.BUTTONS]: ButtonIcon
    };
    return iconMap[type];
  };

  // Block type labels
  const getBlockLabel = (type: WhatsAppBlockType) => {
    const labelMap = {
      [WhatsAppBlockType.HEADER]: 'Header',
      [WhatsAppBlockType.BODY]: 'Body',
      [WhatsAppBlockType.FOOTER]: 'Footer',
      [WhatsAppBlockType.BUTTONS]: 'Buttons'
    };
    return labelMap[type];
  };

  return (
    <div
      onClick={(e) => {
        // Don't trigger if clicking on visibility toggle button
        if (!(e.target as Element).closest('[data-visibility-button]')) {
          onSelect();
        }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
      {/* Left side: Icon + Text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon source={getBlockIcon(block.type)} />
        <Text as="span" variant="bodySm" fontWeight={isSelected ? 'medium' : 'regular'}>
          {getBlockLabel(block.type)}
        </Text>
      </div>

      {/* Right side: Visibility toggle button on hover */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isSelected && (
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            Click to collapse
          </div>
        )}
        {/* Always reserve space for visibility button to prevent layout shift */}
        <div
          data-visibility-button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
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
          <Icon
            source={block.visible !== false ? ViewIcon : HideIcon}
            tone="base"
          />
        </div>
      </div>
    </div>
  );
}
