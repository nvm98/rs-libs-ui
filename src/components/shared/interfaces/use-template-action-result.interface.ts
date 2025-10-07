import { Template } from "@shared/types";

export interface UseTemplateActionResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  savedTemplate: Template | null;
  saveAllTemplates: (templatesData: Omit<Template, 'id' | 'created_at' | 'updated_at'>[], onSuccess?: () => void, onError?: (error: string) => void) => void;
  clearActionState: () => void;
}
