import { en } from './locales/en';
import { es } from './locales/es';
import { sr } from './locales/sr';
import { ru } from './locales/ru';
import { ka } from './locales/ka';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { it } from './locales/it';
import { pt } from './locales/pt';
import { zh } from './locales/zh';
import { ja } from './locales/ja';
import { ar } from './locales/ar';
import { hi } from './locales/hi';

export type Language = "en" | "ka" | "es" | "sr" | "ru" | "fr" | "de" | "it" | "pt" | "zh" | "ja" | "ar" | "hi";

const translations = {
  en,
  ka,
  es,
  sr,
  ru,
  fr,
  de,
  it,
  pt,
  zh,
  ja,
  ar,
  hi
};

export const locales: Language[] = ["en", "ka", "es", "sr", "ru", "fr", "de", "it", "pt", "zh", "ja", "ar", "hi"];

export const getTranslations = (lang: Language) => {
  return translations[lang] || translations.en;
};

export const getTranslation = (lang: Language) => {
    const dictionary = getTranslations(lang);
    return (key: keyof typeof dictionary, ...args: any[]) => {
        let translation = dictionary[key] || translations.en[key] || key;

        if (typeof translation !== 'string') {
            return translation;
        }

        if (args.length > 0) {
            translation = translation.replace(/{(\d+)}/g, (match: string, number: number) => {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        }
        return translation;
    };
};

export const useHotelsTranslation = (lang: Language) => {
    const dictionary = getTranslations(lang).hotels_page;
    const enDictionary = translations.en.hotels_page;

    return (key: string, ...args: any[]) => {
        let translation = dictionary[key] || enDictionary[key] || key;
        if (args.length > 0) {
            translation = translation.replace(/{(\d+)}/g, (match: string, number: number) => {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        }
        return translation;
    };
};

export const useHomeTranslation = (lang: Language) => {
    const dictionary = getTranslations(lang).home_page;
    const enDictionary = translations.en.home_page;

    return (key: keyof typeof dictionary) => {
        return dictionary[key] || enDictionary[key] || key;
    };
};

export type TranslationKey = keyof typeof translations.en;

export const useTranslation = (lang: Language) => {
  const t = (key: TranslationKey): string => {
    // @ts-ignore
    return translations[lang]?.[key] || translations.en[key] || key;
  };
  return { t };
};
