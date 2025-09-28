import { EmailBlock } from '../interfaces/email-block.interface';
interface BlockItemProps {
    block: EmailBlock;
    isSelected: boolean;
    isDragging: boolean;
    onSelect: () => void;
    onRemove: () => void;
    onUpdate: (updates: Partial<EmailBlock>) => void;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
}
export declare function BlockItem({ block, isSelected, isDragging, onSelect, onRemove, onUpdate, onDragStart, onDragEnd }: BlockItemProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=BlockItem.d.ts.map