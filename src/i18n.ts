import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationIT from './locales/it/translation.json';

const resources = {
  en: { translation: translationEN },
  it: { translation: translationIT },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language (English)
    fallbackLng: 'en',
    interpolation: { 
      escapeValue: false,
      // Enable interpolation for dynamic values like {intensity}
      format: function(value, format, lng) {
        if (format === 'number') return new Intl.NumberFormat(lng).format(value);
        return value;
      }
    },
    // Enable debugging in development
    debug: process.env.NODE_ENV === 'development',
    // Namespace configuration
    defaultNS: 'translation',
    ns: ['translation'],
    // React specific options
    react: {
      useSuspense: false,
    }
  });

export default i18n;