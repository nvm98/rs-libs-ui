import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { Template } from '../types';

// API Response types
interface TemplateCreateSuccessResponse {
  success: true;
  data: Template;
}

interface TemplateCreateErrorResponse {
  success: false;
  data: null;
  error: string;
}

type TemplateActionApiResponse = TemplateCreateSuccessResponse | TemplateCreateErrorResponse;

export interface UseTemplateActionResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  savedTemplate: Template | null;
  saveAllTemplates: (templatesData: Omit<Template, 'id' | 'shop' | 'created_at' | 'updated_at'>[]) => void;
  clearActionState: () => void;
}

export function useTemplateAction(): UseTemplateActionResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [savedTemplate, setSavedTemplate] = useState<Template | null>(null);
  const fetcher = useFetcher<TemplateActionApiResponse>();

  // Save all templates (all locales for a templateName)
  const saveAllTemplates = useCallback((templatesData: Omit<Template, 'id' | 'shop' | 'created_at' | 'updated_at'>[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setSavedTemplate(null);

    // Send all templates in a single request as JSON payload
    fetcher.submit(templatesData, {
      method: 'POST',
      action: '/api/templates',
      encType: 'application/json'
    });
  }, [fetcher]);

  // Clear action state
  const clearActionState = useCallback(() => {
    setError(null);
    setSuccess(false);
    setSavedTemplate(null);
    setLoading(false);
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
        setSuccess(false);
      } else {
        setError(null);
        setSuccess(true);
        if (response.data) {
          setSavedTemplate(response.data);
        }
      }
    }
  }, [fetcher.state, fetcher.data]);

  return {
    loading,
    error,
    success,
    savedTemplate,
    saveAllTemplates,
    clearActionState
  };
}
