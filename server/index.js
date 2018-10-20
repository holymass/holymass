require('@babel/polyfill');
require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [
    'react-loadable/babel',
    ['module-resolver', {
      alias: {
        components: './src/components',
      },
    }],
  ],
});

module.exports = require('./app.js');
