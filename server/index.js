require('dotenv').config();
require('@babel/polyfill');
require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread',
    'dynamic-import-node',
    '@loadable/babel-plugin',
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
        },
      },
    ],
  ],
});

const log4js = require('log4js');

log4js.configure({
  appenders: {
    stdout: {
      type: 'stdout',
    },
  },
  categories: {
    default: {
      appenders: ['stdout'],
      level: process.env.LOG_LEVEL || 'info',
    },
  },
});

module.exports = require('./app.js');
