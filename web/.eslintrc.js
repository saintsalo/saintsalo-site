const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  ignorePatterns: ['.eslintrc.js', 'tailwind.config.js', 'next.config.js', 'codegen.ts', './graphql/generated/**/*.*', '**/rnbo.js'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
    'react/require-default-props': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'no-console': ["warn", { allow: ["warn", "error", "info", "debug"] }]
  },
  overrides: [
    {
      files: ['**/*.tsx, **/*.ts'],
      rules: { 'react/prop-types': 'off' },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, './')],
      },
    },
  },
};
