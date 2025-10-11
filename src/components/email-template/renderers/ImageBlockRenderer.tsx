import { BlockRendererProps } from './types/RendererTypes';

export function ImageBlockRenderer({ block, replaceVariables }: BlockRendererProps) {
  const { content, styles } = block;

  // Safe access to content properties with fallbacks
  const imageUrl = content?.imageUrl || '';
  const altText = content?.altText || 'Image';
  const linkUrl = content?.linkUrl || '';
  const caption = content?.caption || '';

  // Safe variable replacement
  const processedImageUrl = imageUrl && replaceVariables ? replaceVariables(imageUrl) : imageUrl;
  const processedLinkUrl = linkUrl && replaceVariables ? replaceVariables(linkUrl) : linkUrl;
  const processedCaption = caption && replaceVariables ? replaceVariables(caption) : caption;

  const imageElement = (
    <img
      src={processedImageUrl}
      alt={altText}
      style={{
        width: styles?.width || '100%',
        height: 'auto',
        display: 'block'
      }}
    />
  );

  return (
    <div style={{
      padding: styles?.padding || '16px 24px',
      textAlign: styles?.alignment || 'center'
    }}>
      {linkUrl ? (
        <a href={processedLinkUrl} style={{ display: 'inline-block' }}>
          {imageElement}
        </a>
      ) : (
        imageElement
      )}
      {caption && (
        <div style={{
          marginTop: '8px',
          fontSize: '14px',
          color: '#666',
          fontStyle: 'italic'
        }}>
          {processedCaption}
        </div>
      )}
    </div>
  );
}
