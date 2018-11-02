import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {reactI18nextModule} from 'react-i18next';

const opts = {
  fallbackLng: 'en',
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
  react: {
    wait: true,
  },
};

i18n.use(Backend);
i18n.use(reactI18nextModule);
i18n.use(LanguageDetector);

export default i18n.init(opts);
