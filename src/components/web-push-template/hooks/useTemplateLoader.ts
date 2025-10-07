import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { initialBlocks } from '../constants';
import { UseTemplateLoaderResult } from '@shared/interfaces';
import { Template, TemplateApiResponse } from '@shared/types';

export function useWebPushTemplateLoader(): UseTemplateLoaderResult {
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
      channel: 'web-push'
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

  // Select template
  const selectTemplate = useCallback((template: Template) => {
    setTemplate(template);
  }, []);

  // Create default template
  const createDefaultTemplate = useCallback((templateName: string) => {
    const defaultTemplate: Template = {
      id: '',
      type: templateName,
      content: '',
      blocks: initialBlocks,
      locale: 'en',
      channel: 'webpush',
      engine: 'handlebars',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
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
