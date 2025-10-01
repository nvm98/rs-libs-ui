import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  BlockStack,
  Select,
  InlineStack
} from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { WhatsAppTemplate, WhatsAppBlockType } from './types';
import { useBlockManager } from './hooks/useBlockManager';
import { BlockItem } from './blocks/BlockItem';
import { VariablePanel } from './VariablePanel';

interface WhatsAppEditorSidebarProps {
  template: WhatsAppTemplate;
  onTemplateChange: (template: WhatsAppTemplate) => void;
}

export const WhatsAppEditorSidebar: React.FC<WhatsAppEditorSidebarProps> = ({
  template,
  onTemplateChange
}) => {
  const [selectedBlockType, setSelectedBlockType] = useState<WhatsAppBlockType | null>(null);
  const [showVariables, setShowVariables] = useState(false);
  const { getBlock, addBlock, removeBlock, updateBlock } = useBlockManager(template, onTemplateChange);

  const blockConfigs = [
    {
      type: WhatsAppBlockType.HEADER,
      title: 'Header',
      description: 'Optional header with text or media',
      required: false
    },
    {
      type: WhatsAppBlockType.BODY,
      title: 'Body',
      description: 'Main message content (required)',
      required: true
    },
    {
      type: WhatsAppBlockType.FOOTER,
      title: 'Footer',
      description: 'Optional footer text',
      required: false
    },
    {
      type: WhatsAppBlockType.BUTTONS,
      title: 'Buttons',
      description: 'Optional action buttons',
      required: false
    }
  ];

  return (
    <div style={{
      width: '320px',
      borderRight: '1px solid #e1e3e5',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      position: 'relative'
    }}>
      <div style={{
        flex: 1,
        paddingBottom: '60px',
        overflowY: 'auto'
      }}>
        <Box width="100%">
          <Box padding={'400'} width="100%">
            <InlineStack align="space-between" blockAlign="center" gap={"200"}>
              <Text as="h3" variant="headingSm">Settings</Text>
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

      {/* Variables Panel - positioned at bottom of sidebar */}
      <VariablePanel
        showVariables={showVariables}
        setShowVariables={setShowVariables}
      />
    </div>
  );
};
