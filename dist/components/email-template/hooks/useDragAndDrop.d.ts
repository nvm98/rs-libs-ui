interface DragState {
    draggedBlockId: string | null;
    dragOverIndex: number | null;
}
export declare function useDragAndDrop(blocks: any[], onMoveBlock: (fromIndex: number, toIndex: number) => void): {
    dragState: DragState;
    handleDragStart: (e: React.DragEvent, blockId: string) => void;
    handleDragOver: (e: React.DragEvent, index: number) => void;
    handleDragLeave: () => void;
    handleDrop: (e: React.DragEvent, dropIndex: number) => void;
    handleDragEnd: () => void;
};
export {};
//# sourceMappingURL=useDragAndDrop.d.ts.map