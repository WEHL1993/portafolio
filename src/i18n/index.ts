import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';

// Función para obtener el idioma guardado o usar el del navegador
const getStoredLanguage = (): string => {
  const storedLang = localStorage.getItem('portfolio-language');
  if (storedLang && (storedLang === 'es' || storedLang === 'en')) {
    return storedLang;
  }
  // Si no hay idioma guardado, detectar del navegador o usar español por defecto
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'en' ? 'en' : 'es';
};

i18n
  .use(initReactI18next)
  .init({
    lng: getStoredLanguage(),
    fallbackLng: 'es',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: es,
      },
      en: {
        translation: en,
      },
    },
  });

export default i18n;
