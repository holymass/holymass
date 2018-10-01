module.exports = {
  root: true,
  extends: [
    'google',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: '16.0',
    },
  },
  plugins: [
    'babel',
    'react',
  ],
  rules: {
    'no-invalid-this': 0,
    'require-jsdoc': 1,
    'babel/no-invalid-this': 1,
  },
};
