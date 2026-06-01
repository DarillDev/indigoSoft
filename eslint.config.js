// @ts-check
const tseslint = require('typescript-eslint');

module.exports = tseslint.config({
  files: ['src/app/shared/ui-kit/**/*.ts'],
  extends: [...tseslint.configs.recommended],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.app.json',
    },
  },
  rules: {
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@shared/ds/*'],
            message: '@ui-kit must not import from @shared/ds — @shared/ds depends on @ui-kit, not the other way around.',
          },
        ],
      },
    ],
  },
});
