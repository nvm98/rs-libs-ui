import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { Template, TemplateApiResponse } from '@shared/types';
import { UseTemplateLoaderResult } from '@shared/interfaces';
import { INITIAL_BLOCKS } from '@sms-template/constants';

export function useSMSTemplateLoader(): UseTemplateLoaderResult {
  const [templates, setTemplates] = useState<Template[] | undefined>();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetcher = useFetcher<TemplateApiResponse>();

  // Load template
  const loadTemplate = useCallback((templateName: string) => {
    setLoading(true);
    setError(null);
    const searchParams = new URLSearchParams({
      type: templateName,
      channel: 'sms'
    });
    const url = `/api/templates/search?${searchParams.toString()}`;
    fetcher.load(url);
  }, [fetcher]);

  // Clear template
  const clearTemplate = useCallback(() => {
    setTemplate(null);
    setError(null);
    setLoading(false);
  }, []);

  // Update templates manually
  const updateTemplates = useCallback((newTemplates: Template[]) => {
    setTemplates(newTemplates);
  }, []);

  // Create default template
  const createDefaultTemplate = useCallback((templateName: string) => {
    const defaultTemplate: Template = {
      content: '',
      locale: 'en',
      type: templateName,
      engine: 'handlebars',
      channel: 'sms',
      isActive: true,
      blocks: INITIAL_BLOCKS
    };

    setTemplate(defaultTemplate);
    setTemplates([defaultTemplate]);
    setError(null);
  }, []);

  // Select template
  const selectTemplate = useCallback((template: Template) => {
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
      
      if (!response) {
        return;
      }
      
      if (!response.success) {
        setError(response.error);
        return;
      }
      
      if (response && Array.isArray(response.data) && response.data.length > 0) {
        const templates = response.data;
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
