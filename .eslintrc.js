const {
  alias,
  extensions,
} = require('./utils/config');

module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  ignorePatterns: ['utils'],
  extends: [
    'airbnb',
  ],
  plugins: [
    'cypress',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: alias,
        extensions,
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': ['error', { skipUndeclared: true }],
  },
};
