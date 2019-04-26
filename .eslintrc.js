const path = require('path');

module.exports = {
  root: true,
  extends: [
    'plugin:import/recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
  },
  settings: {
    react: {
      version: '16.8',
    },
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, 'webpack.config.js'),
      },
    },
  },
  plugins: ['babel', 'prettier', 'react', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'],
        ],
        'newlines-between': 'never',
      },
    ],
    'prefer-destructuring': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
