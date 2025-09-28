import { StyleOnlyRendererProps } from './types/RendererTypes';

export function DividerBlockRenderer({ block }: StyleOnlyRendererProps) {
  const { styles } = block;
  
  return (
    <div style={{
      margin: styles.margin || '24px 0',
      padding: '0 24px'
    }}>
      <hr style={{
        border: 'none',
        borderTop: `1px solid ${styles.borderColor || '#e1e3e5'}`,
        margin: 0
      }} />
    </div>
  );
}
