import { RendererComponentProps } from './types/RendererTypes';

export function DividerBlockRenderer({ block }: RendererComponentProps) {
  const { content, styles } = block;

  return (
    <div style={{
      margin: styles.margin || '24px 0',
      padding: styles.padding || '0 24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <hr style={{
        border: 'none',
        borderTop: `${content.lineHeight || '1px'} ${content.lineStyle || 'solid'} ${content.lineColor || '#e1e3e5'}`,
        margin: 0,
        width: content.width || '80%'
      }} />
    </div>
  );
}
