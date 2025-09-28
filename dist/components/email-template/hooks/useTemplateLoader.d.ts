import { Template } from '../types';
export interface UseTemplateLoaderResult {
    templates?: Template[];
    template: Template | null;
    loading: boolean;
    error: string | null;
    loadTemplate: (templateName: string) => void;
    saveTemplate: (templateData: Omit<Template, 'id' | 'shop' | 'created_at' | 'updated_at'>) => void;
    clearTemplate: () => void;
    updateTemplates: (newTemplates: Template[]) => void;
    selectTemplate: (template: Template) => void;
}
export declare function useTemplateLoader(): UseTemplateLoaderResult;
//# sourceMappingURL=useTemplateLoader.d.ts.map