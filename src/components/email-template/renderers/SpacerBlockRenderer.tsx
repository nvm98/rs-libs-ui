import { RendererComponentProps } from './types/RendererTypes';

export function SpacerBlockRenderer({ block }: RendererComponentProps) {
  const { content } = block;

  return (
    <div style={{
      height: content.height || '32px',
      backgroundColor: content.backgroundColor || 'transparent',
    }} />
  );
}
