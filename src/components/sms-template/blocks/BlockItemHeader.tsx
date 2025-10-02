import React from 'react';
import { InlineStack, Text, Icon } from '@shopify/polaris';
import { TextIcon } from '@shopify/polaris-icons';
import { SMSBlock } from '../types';

interface BlockItemHeaderProps {
  block: SMSBlock;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const BlockItemHeader: React.FC<BlockItemHeaderProps> = ({
  block,
  isSelected,
  isHovered,
  onSelect,
  onToggleVisibility,
  onMouseEnter,
  onMouseLeave,
}) => {
  const getBlockIcon = () => {
    switch (block.type) {
      case 'body':
        return TextIcon;
      default:
        return TextIcon;
    }
  };

  const headerStyle: React.CSSProperties = {
    padding: '12px 16px',
    cursor: 'pointer',
    borderBottom: isSelected ? '1px solid #e1e3e5' : 'none',
    backgroundColor: isSelected ? '#f9fafb' : 'transparent',
  };

  return (
    <div
      style={headerStyle}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <InlineStack align="space-between" blockAlign="center">
        <InlineStack gap="200" blockAlign="center">
          <Icon source={getBlockIcon()} tone="subdued" />
          <Text as="h4" variant="headingSm" fontWeight="medium">
            {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
          </Text>
        </InlineStack>
      </InlineStack>
    </div>
  );
};
