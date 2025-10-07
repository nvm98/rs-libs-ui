import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { Template } from '../types';
import { initialBlocks } from '../constants/block.constant';

// API Response types
interface TemplateApiSuccessResponse {
  success: true;
  data: Template[];
}

interface TemplateApiErrorResponse {
  success: false;
  data: null;
  error: string;
}

type TemplateApiResponse = TemplateApiSuccessResponse | TemplateApiErrorResponse;

export interface UseTemplateLoaderResult {
  templates?: Template[],
  template: Template | null;
  loading: boolean;
  error: string | null;
  loadTemplate: (templateName: string) => void;
  createDefaultTemplate: (templateName: string) => void;
  clearTemplate: () => void;
  updateTemplates: (newTemplates: Template[]) => void;
  selectTemplate: (template: Template) => void;
}

export function useTemplateLoader(): UseTemplateLoaderResult {
  const [templates, setTemplates] = useState<Template[] | undefined>();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetcher = useFetcher<TemplateApiResponse>();

  // load template
  const loadTemplate = useCallback((templateName: string) => {
    setLoading(true);
    setError(null);
    const searchParams = new URLSearchParams({
      type: templateName,
      channel: 'email'
    });
    const url = `/api/templates/search?${searchParams.toString()}`;
    fetcher.load(url);
  }, [fetcher]);



  // clear template
  const clearTemplate = useCallback(() => {
    setTemplate(null);
    setError(null);
    setLoading(false);
  }, []);

  // update templates manually
  const updateTemplates = useCallback((newTemplates: Template[]) => {
    setTemplates(newTemplates);
  }, []);

  // select tempalte
  const selectTemplate = useCallback((template: Template) => {
    setTemplate(template);
  }, []);

  // create default template
  const createDefaultTemplate = useCallback((templateName: string) => {
    const defaultTemplate: Template = {
      type: templateName,
      content: '',
      blocks: initialBlocks,
      locale: 'en',
      channel: 'email',
      engine: 'handlebars',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setTemplates([defaultTemplate]);
    setTemplate(defaultTemplate);
  }, []);

  // Handle fetcher state changes
  useEffect(() => {
    if (fetcher.state === 'loading') {
      setLoading(true);
    } 
    if (fetcher.state === 'idle') {
      setLoading(false);
      const response = fetcher.data;
      if(!response) {return}
      if(!response.success) {
        setError(response.error);
      }
      if (response && Array.isArray(response.data) && response.data.length > 0) {
        let templates = response.data;
        setTemplates(templates);
        setTemplate(templates[0]);
      } else {
        setTemplates(undefined);
        setTemplate(null);
      }
    }
  }, [fetcher.state, fetcher.data]);

  return {
    templates,
    template,
    loading,
    error,
    loadTemplate,
    createDefaultTemplate,
    clearTemplate,
    updateTemplates,
    selectTemplate
  };
}
