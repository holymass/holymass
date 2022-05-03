const path = require('path');

module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 7,
  },
  plugins: [
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    '@typescript-eslint/eslint-plugin',
  ],
  rules: {
    'prefer-destructuring': 'off',

    '@typescript-eslint/dot-notation': 'off',
    'dot-notation': 'error',
    '@typescript-eslint/no-implied-eval': 'off',
    'no-implied-eval': 'error',
    '@typescript-eslint/no-throw-literal': 'off',
    'no-throw-literal': 'error',
    '@typescript-eslint/return-await': 'off',
    'no-return-await': 'error',
  },
};
