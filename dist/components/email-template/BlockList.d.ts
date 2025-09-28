import { EmailBlock } from './interfaces/email-block.interface';
import { EmailBlockType } from './types/email-block-type.type';
interface BlockListProps {
    blocks: EmailBlock[];
    selectedBlockId: string | null;
    onSelectedBlockChange: (id: string | null) => void;
    onAddBlock: (type: EmailBlockType, index?: number) => void;
    onRemoveBlock: (id: string) => void;
    onUpdateBlock: (id: string, updates: Partial<EmailBlock>) => void;
    onMoveBlock: (fromIndex: number, toIndex: number) => void;
}
export declare function BlockList({ blocks, selectedBlockId, onSelectedBlockChange, onAddBlock, onRemoveBlock, onUpdateBlock, onMoveBlock }: BlockListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=BlockList.d.ts.map