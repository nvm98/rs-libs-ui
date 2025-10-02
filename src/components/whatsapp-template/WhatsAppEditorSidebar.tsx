import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  BlockStack,
  Select,
  InlineStack,
} from '@shopify/polaris';
import { ChevronLeftIcon } from '@shopify/polaris-icons';
import { WhatsAppTemplate, WhatsAppBlockType } from './types';
import { useBlockManager } from './hooks/useBlockManager';
import { BlockItem } from './blocks/BlockItem';
import { VariablePanel } from './VariablePanel';

interface WhatsAppEditorSidebarProps {
  template: WhatsAppTemplate;
  onTemplateChange: (template: WhatsAppTemplate) => void;
  // Mobile full-screen mode props
  isFullScreen?: boolean;
  onClose?: () => void;
  selectedBlockType?: WhatsAppBlockType | null;
  onBlockTypeSelect?: (blockType: WhatsAppBlockType | null) => void;
}

export const WhatsAppEditorSidebar: React.FC<WhatsAppEditorSidebarProps> = ({
  template,
  onTemplateChange,
  isFullScreen = false,
  onClose,
  selectedBlockType: externalSelectedBlockType,
  onBlockTypeSelect
}) => {
  const [internalSelectedBlockType, setInternalSelectedBlockType] = useState<WhatsAppBlockType | null>(null);
  const [showVariables, setShowVariables] = useState(false);
  const { updateBlock } = useBlockManager(template, onTemplateChange);

  // Use external selectedBlockType if provided (for full-screen mode), otherwise use internal state
  const selectedBlockType = externalSelectedBlockType !== undefined ? externalSelectedBlockType : internalSelectedBlockType;
  const setSelectedBlockType = onBlockTypeSelect || setInternalSelectedBlockType;

  const getBlockTitle = (type: WhatsAppBlockType) => {
    const titles = {
      header: 'Header Settings',
      body: 'Body Settings',
      footer: 'Footer Settings',
      buttons: 'Buttons Settings'
    };
    return titles[type] || 'Block Settings';
  };

  return (
    <div style={{
      width: isFullScreen ? '100%' : '320px',
      height: isFullScreen ? '100vh' : 'auto',
      borderRight: isFullScreen ? 'none' : '1px solid #e1e3e5',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      position: isFullScreen ? 'fixed' : 'relative',
      top: isFullScreen ? 0 : 'auto',
      left: isFullScreen ? 0 : 'auto',
      right: isFullScreen ? 0 : 'auto',
      bottom: isFullScreen ? 0 : 'auto',
      zIndex: isFullScreen ? 50 : 'auto'
    }}>
      <div style={{
        flex: 1,
        paddingBottom: isFullScreen ? '16px' : '60px',
        overflowY: 'auto'
      }}>
        <Box width="100%">
          <Box padding={'200'} width="100%">
            <InlineStack align="space-between" blockAlign="center" gap={"200"}>
              <InlineStack gap={"200"}>
                {isFullScreen && (
                  <Button onClick={onClose} variant='plain' icon={ChevronLeftIcon} accessibilityLabel="Back" />
                )}
                <Text as="h3" variant="headingSm">{ !selectedBlockType || !isFullScreen ? 'Settings' : getBlockTitle(selectedBlockType)}</Text>
              </InlineStack>
              <div style={{ minWidth: '150px' }}>
                <Select
                  label=""
                  options={[
                    { label: 'English', value: 'en' },
                    { label: 'Vietnamese', value: 'vi' }
                  ]}
                  value="en"
                  onChange={() => {}}
                  placeholder="Select language"
                />
              </div>
            </InlineStack>
          </Box>

          <BlockStack gap="100">
            {/* Existing Blocks */}
            {template.blocks.map(block => (
                <BlockItem
                  key={block.id}
                  block={block}
                  isSelected={selectedBlockType === block.type}
                  onSelect={() => setSelectedBlockType(
                    selectedBlockType === block.type ? null : block.type
                  )}
                  onToggleVisibility={() => updateBlock(block.type, { visible: block.visible !== false ? false : true })}
                  onUpdate={(updates) => updateBlock(block.type, updates)}
                />
              ))}
          </BlockStack>
        </Box>
      </div>

      <VariablePanel
        showVariables={showVariables}
        setShowVariables={setShowVariables}
      />
    </div>
  );
};
