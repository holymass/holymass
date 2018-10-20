module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'react-loadable/babel',
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
};
