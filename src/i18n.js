import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

const options = {
  fallbackLng: 'zh',
  load: 'languageOnly',
  ns: ['base'],
  defaultNS: 'base',
  detection: {
    lookupCookie: 'i18next',
    caches: ['cookie'],
  },
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next);

if (!i18n.isInitialized) {
  i18n.init(options);
}

export default i18n;
