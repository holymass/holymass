require('dotenv').config();
require('@babel/polyfill');
require('@babel/register')({
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    '@babel/plugin-proposal-object-rest-spread',
    'dynamic-import-node',
    'loadable-components/babel',
    ['module-resolver', {
      alias: {
        components: './src/components',
      },
    }],
  ],
});

const log4js = require('log4js');
log4js.configure({
  appenders: {
    default: {
      backups: 5,
      compress: true,
      filename: process.env.LOG_FILE || 'server.log',
      type: 'file',
      maxLogSize: 50 * 1024 * 1024,
    },
  },
  categories: {
    default: {
      appenders: [
        'default',
      ],
      level: process.env.LOG_LEVEL || 'info',
    },
  },
});

module.exports = require('./app.js');
