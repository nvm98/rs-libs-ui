import { useState, useCallback } from 'react';
import { Language } from '../../shared/interfaces/language.interface';
import { LANGUAGES } from '../../shared/constants/language.constant';

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
    if (LANGUAGES.some(lang => lang.value === locale)) {
      setCurrentLocale(locale);
    }
  }, []);

  const getLanguageLabel = useCallback((locale: string): string => {
    const language = LANGUAGES.find(lang => lang.value === locale);
    return language?.label || locale;
  }, []);

  const isValidLocale = useCallback((locale: string): boolean => {
    return LANGUAGES.some(lang => lang.value === locale);
  }, []);

  return {
    currentLocale,
    availableLanguages: LANGUAGES,
    setLocale,
    getLanguageLabel,
    isValidLocale
  };
};
