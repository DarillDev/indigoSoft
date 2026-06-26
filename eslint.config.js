// @ts-check
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.spec.ts'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['src/**/*.spec.ts'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.spec.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['src/app/shared/ds/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@shared/ui-kit/*'],
              message: '@shared/ds must not import from @shared/ui-kit — @shared/ui-kit depends on @shared/ds, not the other way around.',
            },
          ],
        },
      ],
    },
  },
);
