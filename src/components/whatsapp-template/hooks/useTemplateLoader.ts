import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { WhatsAppBlockType } from '../types';
import { UseTemplateLoaderResult } from '@shared/interfaces';
import { Template, TemplateApiResponse } from '@shared/types';

export function useWhatsAppTemplateLoader(): UseTemplateLoaderResult {
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
      channel: 'whatsapp'
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
      type: templateName,
      content: '',
      locale: 'en',
      channel: 'whatsapp',
      engine: 'handlebars',
      isActive: true,
      blocks: [
        {
          id: 'header-1',
          type: WhatsAppBlockType.HEADER,
          format: 'TEXT',
          text: 'Hello {{customer_first_name}}!',
        },
        {
          id: 'body-1',
          type: WhatsAppBlockType.BODY,
          text: 'Thank you for your interest in our products. We\'ll keep you updated!',
          variables: []
        },
        {
          id: 'footer-1',
          type: WhatsAppBlockType.FOOTER,
          text: 'Best regards, {{shop_name}}'
        },
        {
          id: 'buttons-1',
          type: WhatsAppBlockType.BUTTONS,
          buttons: [
            {
              type: 'QUICK_REPLY',
              text: 'Yes, notify me'
            },
            {
              type: 'URL',
              text: 'Visit Store',
              url: 'https://{{shop_url}}'
            }
          ]
        }
      ]
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
