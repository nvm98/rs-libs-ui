import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { SMSTemplate } from '../types';

// API Response types
interface SMSTemplateApiSuccessResponse {
  success: true;
  data: SMSTemplate[];
}

interface SMSTemplateApiErrorResponse {
  success: false;
  data: null;
  error: string;
}

interface SMSTemplateCreateSuccessResponse {
  success: true;
  data: SMSTemplate;
}

type SMSTemplateApiResponse = SMSTemplateApiSuccessResponse | SMSTemplateApiErrorResponse | SMSTemplateCreateSuccessResponse;

export interface UseSMSTemplateLoaderResult {
  templates?: SMSTemplate[],
  template: SMSTemplate | null;
  loading: boolean;
  error: string | null;
  loadTemplate: (templateName: string) => void;
  createDefaultTemplate: (templateName: string) => void;
  saveAllTemplates: (templatesData: Omit<SMSTemplate, 'id' | 'shop' | 'created_at' | 'updated_at'>[]) => void;
  clearTemplate: () => void;
  updateTemplates: (newTemplates: SMSTemplate[]) => void;
  selectTemplate: (template: SMSTemplate) => void;
}

export function useSMSTemplateLoader(): UseSMSTemplateLoaderResult {
  const [templates, setTemplates] = useState<SMSTemplate[] | undefined>();
  const [template, setTemplate] = useState<SMSTemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetcher = useFetcher<SMSTemplateApiResponse>();

  // load template
  const loadTemplate = useCallback((templateName: string) => {
    setLoading(true);
    setError(null);
    const searchParams = new URLSearchParams({
      name: templateName,
      channel: 'sms'
    });
    const url = `/api/templates/search?${searchParams.toString()}`;
    fetcher.load(url);
  }, [fetcher]);

  //save all templates (all locales for a templateName)
  const saveAllTemplates = useCallback((templatesData: SMSTemplate[]) => {
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
  const updateTemplates = useCallback((newTemplates: SMSTemplate[]) => {
    setTemplates(newTemplates);
  }, []);

  // create default template
  const createDefaultTemplate = useCallback((templateName: string) => {
    const defaultTemplate: SMSTemplate = {
      name: templateName,
      content: '',
      locale: 'en',
      type: 'sms',
      engine: 'liquid',
      is_active: true,
      blocks: [
        {
          id: 'body-1',
          type: 'body',
          content: 'Hello {{customer_first_name}}! Thank you for your interest in our products. We\'ll keep you updated! - {{shop_name}}'
        }
      ]
    };

    setTemplate(defaultTemplate);
    setTemplates([defaultTemplate]);
    setError(null);
  }, []);

  // select template
  const selectTemplate = useCallback((template: SMSTemplate) => {
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
    createDefaultTemplate,
    saveAllTemplates,
    clearTemplate,
    updateTemplates,
    selectTemplate
  };
}
