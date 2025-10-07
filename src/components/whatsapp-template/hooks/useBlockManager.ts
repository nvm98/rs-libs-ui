import { useCallback } from 'react';
import { WhatsAppBlock, WhatsAppBlockType } from '../types';
import { Template } from '@shared/types';

export function useBlockManager(
  template: Template,
  onTemplateChange: (template: Template) => void
) {
  // Get block by type
  const getBlock = useCallback((type: WhatsAppBlockType): WhatsAppBlock | undefined => {
    return template.blocks.find(block => block.type === type);
  }, [template.blocks]);

  // Add new block
  const addBlock = useCallback((type: WhatsAppBlockType) => {
    let newBlock: WhatsAppBlock;
    switch (type) {
      case WhatsAppBlockType.HEADER:
        newBlock = {
          id: `${type}-${Date.now()}`,
          type: WhatsAppBlockType.HEADER,
          format: 'TEXT',
          text: '',
          visible: true
        };
        break;
      case WhatsAppBlockType.BODY:
        newBlock = {
          id: `${type}-${Date.now()}`,
          type: WhatsAppBlockType.BODY,
          text: '',
          visible: true
        };
        break;
      case WhatsAppBlockType.FOOTER:
        newBlock = {
          id: `${type}-${Date.now()}`,
          type: WhatsAppBlockType.FOOTER,
          text: '',
          visible: true
        };
        break;
      case WhatsAppBlockType.BUTTONS:
        newBlock = {
          id: `${type}-${Date.now()}`,
          type: WhatsAppBlockType.BUTTONS,
          buttons: [],
          visible: true
        };
        break;
      default:
        return;
    }

    onTemplateChange({
      ...template,
      blocks: [...template.blocks, newBlock]
    });
  }, [template, onTemplateChange]);

  // Remove block
  const removeBlock = useCallback((type: WhatsAppBlockType) => {
    onTemplateChange({
      ...template,
      blocks: template.blocks.filter(block => block.type !== type)
    });
  }, [template, onTemplateChange]);

  // Update block
  const updateBlock = useCallback((type: WhatsAppBlockType, updates: Partial<WhatsAppBlock>) => {
    onTemplateChange({
      ...template,
      blocks: template.blocks.map(block =>
        block.type === type ? { ...block, ...updates } as WhatsAppBlock : block
      )
    });
  }, [template, onTemplateChange]);

  // Check if block exists
  const hasBlock = useCallback((type: WhatsAppBlockType): boolean => {
    return template.blocks.some(block => block.type === type);
  }, [template.blocks]);

  return {
    getBlock,
    addBlock,
    removeBlock,
    updateBlock,
    hasBlock
  };
}
