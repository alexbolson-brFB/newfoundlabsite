import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Language, Translations, translations } from './translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const getInitialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem('foundlab_language');
    if (saved === 'en' || saved === 'pt') return saved;
  } catch (e) {
    console.warn('localStorage access denied or unavailable', e);
  }
  try {
    const browserLang = typeof navigator !== 'undefined' && navigator.language ? navigator.language.toLowerCase() : 'pt';
    return browserLang.startsWith('en') ? 'en' : 'pt';
  } catch (e) {
    return 'pt';
  }
};

const initialLang = getInitialLanguage();

const defaultContextValue: LanguageContextProps = {
  language: initialLang,
  setLanguage: () => {},
  t: translations[initialLang] || translations.pt,
};

const globalContextKey = '__FOUNDLAB_LANGUAGE_CONTEXT__';
const LanguageContext =
  ((globalThis as any)[globalContextKey] as React.Context<LanguageContextProps | undefined>) ||
  (((globalThis as any)[globalContextKey] = createContext<LanguageContextProps | undefined>(defaultContextValue)));

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem('foundlab_language', language);
    } catch (e) {
      console.warn('localStorage setItem denied or unavailable', e);
    }
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language] || translations.pt,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  return context ?? defaultContextValue;
};

