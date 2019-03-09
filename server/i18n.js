import path from 'path';
import i18n from 'i18next';
import Backend from 'i18next-node-fs-backend';
import {initReactI18next} from 'react-i18next';

const options = {
  backend: {
    loadPath: path.resolve(__dirname, '../locales/{{lng}}/{{ns}}.json'),
  },
  fallbackLng: 'zh',
  load: 'languageOnly',
  preload: ['en', 'zh'],
  ns: ['base', 'mass', 'church', 'settings'],
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
    .use(initReactI18next);

if (!i18n.isInitialized) {
  i18n.init(options);
}

export default i18n;
