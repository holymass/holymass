import path from 'path';
import i18n from 'i18next';
import Backend from 'i18next-node-fs-backend';

const opts = {
  backend: {
    loadPath: path.resolve(__dirname, '../locales/{{lng}}/{{ns}}.json'),
  },
  fallbackLng: 'en',
  ns: ['base'],
  defaultNS: 'base',
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
  },
};

i18n.use(Backend);

export default i18n.init(opts);
