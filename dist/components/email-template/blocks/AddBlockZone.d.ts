import { EmailBlockType } from '../types/email-block-type.type';
interface AddBlockZoneProps {
    position: number | 'top' | 'bottom';
    onAddBlock: (type: EmailBlockType, index?: number) => void;
    isDragOver?: boolean;
    isDragging?: boolean;
}
export declare function AddBlockZone({ position, onAddBlock, isDragOver, isDragging }: AddBlockZoneProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AddBlockZone.d.ts.map