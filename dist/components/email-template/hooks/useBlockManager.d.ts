import { EmailBlock } from '../interfaces/email-block.interface';
import { EmailBlockType } from '../types/email-block-type.type';
export declare function useBlockManager(blocks: EmailBlock[], onBlocksChange: (blocks: EmailBlock[]) => void): {
    addBlock: (type: EmailBlockType, index?: number) => void;
    removeBlock: (id: string) => void;
    updateBlock: (id: string, updates: Partial<EmailBlock>) => void;
    moveBlock: (fromIndex: number, toIndex: number) => void;
};
//# sourceMappingURL=useBlockManager.d.ts.map