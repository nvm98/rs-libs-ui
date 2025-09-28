interface DropZoneProps {
    index: number;
    isDragOver: boolean;
    isDragging: boolean;
    onDragOver: (e: React.DragEvent, index: number) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent, index: number) => void;
}
export declare function DropZone({ index, isDragOver, isDragging, onDragOver, onDragLeave, onDrop }: DropZoneProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=DropZone.d.ts.map