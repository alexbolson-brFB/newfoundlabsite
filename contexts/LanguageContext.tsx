import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Language, Translations, translations } from './translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('foundlab_language');
      if (saved === 'en' || saved === 'pt') return saved;
    } catch (e) {
      console.warn('localStorage access denied or unavailable', e);
    }
    try {
      const browserLang = typeof navigator !== 'undefined' && navigator.language ? navigator.language.toLowerCase() : 'en';
      return browserLang.startsWith('pt') ? 'pt' : 'en';
    } catch (e) {
      return 'en';
    }
  });

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
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
