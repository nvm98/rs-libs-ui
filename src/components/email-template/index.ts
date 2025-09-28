// Main unified component
export { EmailTemplateEditor, EmailTemplateEditor as default } from './EmailTemplateEditor';

// Legacy exports for backward compatibility
export { EmailTemplateEditor as EmailTemplateModal } from './EmailTemplateEditor';
export { EmailTemplateEditor as FlexibleEmailModal } from './EmailTemplateEditor';

// Other components
export { EmailEditorLayout } from './EmailEditorLayout';
export { EmailEditorEmptyState } from './EmailEditorEmptyState';
export { EmailEditorErrorState } from './EmailEditorErrorState';
export { EmailEditorSkeleton } from './skeletons/EmailEditorSkeleton';

// Types and interfaces
export type { EmailBlock } from './interfaces/email-block.interface';
export type { Template } from './types';

// Constants
export { initialBlocks } from './constants/block.constant';

// Hooks
export { useTemplateLoader } from './hooks/useTemplateLoader';
