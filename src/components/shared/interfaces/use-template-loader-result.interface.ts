import { Template } from "@shared/types";

export interface UseTemplateLoaderResult {
  templates?: Template[];
  template: Template | null;
  loading: boolean;
  error: string | null;
  loadTemplate: (templateName: string) => void;
  createDefaultTemplate: (templateName: string) => void;
  clearTemplate: () => void;
  updateTemplates: (newTemplates: Template[]) => void;
  selectTemplate: (template: Template) => void;
}
