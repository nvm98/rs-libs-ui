import { StyleOnlyRendererProps } from './types/RendererTypes';

export function SpacerBlockRenderer({ block }: StyleOnlyRendererProps) {
  const { styles } = block;
  
  return (
    <div style={{
      height: styles.height || '32px'
    }} />
  );
}
