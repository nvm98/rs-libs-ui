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
export declare function BlockHeader({ block, isSelected, isHovered, onSelect, onRemove, onDragStart, onDragEnd, onMouseEnter, onMouseLeave }: BlockHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=BlockHeader.d.ts.map