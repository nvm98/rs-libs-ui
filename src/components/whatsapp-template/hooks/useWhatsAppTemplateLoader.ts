import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { WhatsAppTemplate } from '../types';

// API Response types
interface WhatsAppTemplateApiSuccessResponse {
  success: true;
  data: WhatsAppTemplate[];
}

interface WhatsAppTemplateApiErrorResponse {
  success: false;
  data: null;
  error: string;
}

interface WhatsAppTemplateCreateSuccessResponse {
  success: true;
  data: WhatsAppTemplate;
}

type WhatsAppTemplateApiResponse = WhatsAppTemplateApiSuccessResponse | WhatsAppTemplateApiErrorResponse | WhatsAppTemplateCreateSuccessResponse;

export interface UseWhatsAppTemplateLoaderResult {
  templates?: WhatsAppTemplate[],
  template: WhatsAppTemplate | null;
  loading: boolean;
  error: string | null;
  loadTemplate: (templateName: string) => void;
  saveAllTemplates: (templatesData: Omit<WhatsAppTemplate, 'id' | 'shop' | 'created_at' | 'updated_at'>[]) => void;
  clearTemplate: () => void;
  updateTemplates: (newTemplates: WhatsAppTemplate[]) => void;
  selectTemplate: (template: WhatsAppTemplate) => void;
}

export function useWhatsAppTemplateLoader(): UseWhatsAppTemplateLoaderResult {
  const [templates, setTemplates] = useState<WhatsAppTemplate[] | undefined>();
  const [template, setTemplate] = useState<WhatsAppTemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetcher = useFetcher<WhatsAppTemplateApiResponse>();

  // load template
  const loadTemplate = useCallback((templateName: string) => {
    setLoading(true);
    setError(null);
    const searchParams = new URLSearchParams({
      name: templateName,
      channel: 'whatsapp'
    });
    const url = `/api/templates/search?${searchParams.toString()}`;
    fetcher.load(url);
  }, [fetcher]);

  //save all templates (all locales for a templateName)
  const saveAllTemplates = useCallback((templatesData: WhatsAppTemplate[]) => {
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
  const updateTemplates = useCallback((newTemplates: WhatsAppTemplate[]) => {
    setTemplates(newTemplates);
  }, []);

  // select template
  const selectTemplate = useCallback((template: WhatsAppTemplate) => {
    setTemplate(template);
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
    saveAllTemplates,
    clearTemplate,
    updateTemplates,
    selectTemplate
  };
}
