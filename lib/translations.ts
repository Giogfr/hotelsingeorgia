import { en } from './locales/en';
import { es } from './locales/es';
import { sr } from './locales/sr';
import { ru } from './locales/ru';
import { ka } from './locales/ka';

export type Language = "en" | "ka" | "es" | "sr" | "ru";

const translations = {
  en,
  ka,
  es,
  sr,
  ru
};

export type TranslationKey = keyof typeof translations.en;

export const useTranslation = (lang: Language) => {
  const t = (key: TranslationKey): string => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };
  return { t };
};
