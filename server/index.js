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

module.exports = require('./app.js');
