import { useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { Template, TemplateActionApiResponse } from '@shared/types';
import { UseTemplateActionResult } from '@shared/interfaces';

export function useWebPushTemplateAction(): UseTemplateActionResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [savedTemplate, setSavedTemplate] = useState<Template | null>(null);
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null);
  const [onErrorCallback, setOnErrorCallback] = useState<((error: string) => void) | null>(null);
  const fetcher = useFetcher<TemplateActionApiResponse>();

  // Save all templates (all locales for a templateName)
  const saveAllTemplates = useCallback((templatesData: Omit<Template, 'id' | 'created_at' | 'updated_at'>[], onSuccess?: () => void, onError?: (error: string) => void) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setSavedTemplate(null);

    // Store callbacks
    setOnSuccessCallback(() => onSuccess || null);
    setOnErrorCallback(() => onError || null);

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
        // Execute error callback if available
        if (onErrorCallback) {
          onErrorCallback(response.error);
          setOnErrorCallback(null); // Clear callback after use
        }
      } else {
        setError(null);
        setSuccess(true);
        if (response.data) {
          setSavedTemplate(response.data);
        }
        // Execute success callback if available
        if (onSuccessCallback) {
          onSuccessCallback();
          setOnSuccessCallback(null); // Clear callback after use
        }
      }
    }
  }, [fetcher.state, fetcher.data, onSuccessCallback, onErrorCallback]);

  return {
    loading,
    error,
    success,
    savedTemplate,
    saveAllTemplates,
    clearActionState
  };
}
