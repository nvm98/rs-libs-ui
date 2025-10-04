import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { WebPushTemplate } from '../types';
import { initialBlocks } from '../constants';

// API Response types
interface WebPushTemplateApiSuccessResponse {
  success: true;
  data: WebPushTemplate[];
}

interface WebPushTemplateApiErrorResponse {
  success: false;
  data: null;
  error: string;
}

interface WebPushTemplateCreateSuccessResponse {
  success: true;
  data: WebPushTemplate;
}

type WebPushTemplateApiResponse = WebPushTemplateApiSuccessResponse | WebPushTemplateApiErrorResponse | WebPushTemplateCreateSuccessResponse;

export interface UseWebPushTemplateLoaderResult {
  templates?: WebPushTemplate[],
  template: WebPushTemplate | null;
  loading: boolean;
  error: string | null;
  loadTemplate: (templateName: string) => void;
  createDefaultTemplate: (templateName: string) => void;
  saveAllTemplates: (templatesData: Omit<WebPushTemplate, 'id' | 'shop' | 'created_at' | 'updated_at'>[]) => void;
  clearTemplate: () => void;
  updateTemplates: (newTemplates: WebPushTemplate[]) => void;
  selectTemplate: (template: WebPushTemplate) => void;
}

export function useWebPushTemplateLoader(): UseWebPushTemplateLoaderResult {
  const [templates, setTemplates] = useState<WebPushTemplate[] | undefined>();
  const [template, setTemplate] = useState<WebPushTemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetcher = useFetcher<WebPushTemplateApiResponse>();

  // load template
  const loadTemplate = useCallback((templateName: string) => {
    setLoading(true);
    setError(null);
    const searchParams = new URLSearchParams({
      type: templateName,
      channel: 'web-push'
    });
    const url = `/api/templates/search?${searchParams.toString()}`;
    fetcher.load(url);
  }, [fetcher]);

  //save all templates (all locales for a templateName)
  const saveAllTemplates = useCallback((templatesData: WebPushTemplate[]) => {
    setLoading(true);
    setError(null);

    // Save each template individually
    templatesData.forEach(templateData => {
      const formData = new FormData();
      Object.entries(templateData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      fetcher.submit(formData, {
        method: 'POST',
        action: '/api/templates'
      });
    });
  }, [fetcher]);

  // clear template
  const clearTemplate = useCallback(() => {
    setTemplate(null);
    setError(null);
    setLoading(false);
  }, []);

  // update templates manually
  const updateTemplates = useCallback((newTemplates: WebPushTemplate[]) => {
    setTemplates(newTemplates);
  }, []);

  // select template
  const selectTemplate = useCallback((template: WebPushTemplate) => {
    setTemplate(template);
  }, []);

  // create default template
  const createDefaultTemplate = useCallback((templateName: string) => {
    const defaultTemplate: WebPushTemplate = {
      id: '',
      shop: '',
      name: templateName,
      content: '',
      blocks: initialBlocks,
      locale: 'en',
      type: 'web-push' as const,
      engine: 'liquid' as const,
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
    saveAllTemplates,
    clearTemplate,
    updateTemplates,
    selectTemplate
  };
}
