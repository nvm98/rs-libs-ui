import { useState, useCallback } from 'react';
import { AVAILABLE_LANGUAGES } from '../constants';
import { Language } from '../../shared/interfaces/language.interface';

export interface UseLocaleReturn {
  currentLocale: string;
  availableLanguages: Language[];
  setLocale: (locale: string) => void;
  getLanguageLabel: (locale: string) => string;
  isValidLocale: (locale: string) => boolean;
}

export const useLocale = (initialLocale: string = 'en'): UseLocaleReturn => {
  const [currentLocale, setCurrentLocale] = useState<string>(initialLocale);

  const setLocale = useCallback((locale: string) => {
    if (AVAILABLE_LANGUAGES.some(lang => lang.value === locale)) {
      setCurrentLocale(locale);
    }
  }, []);

  const getLanguageLabel = useCallback((locale: string): string => {
    const language = AVAILABLE_LANGUAGES.find(lang => lang.value === locale);
    return language?.label || locale;
  }, []);

  const isValidLocale = useCallback((locale: string): boolean => {
    return AVAILABLE_LANGUAGES.some(lang => lang.value === locale);
  }, []);

  return {
    currentLocale,
    availableLanguages: AVAILABLE_LANGUAGES,
    setLocale,
    getLanguageLabel,
    isValidLocale
  };
};
