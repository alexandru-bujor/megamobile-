import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import roTranslations from '@/i18n/ro.json';
import enTranslations from '@/i18n/en.json';
import ruTranslations from '@/i18n/ru.json';

export type Language = 'ro' | 'en' | 'ru';

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const translations = {
  ro: roTranslations,
  en: enTranslations,
  ru: ruTranslations,
};

export const useI18n = create<I18nStore>()(
  persist(
    (set) => ({
      language: 'ro',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'mega-mobile-language',
    }
  )
);

export function useTranslations() {
  const { language } = useI18n();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { t, language };
}
