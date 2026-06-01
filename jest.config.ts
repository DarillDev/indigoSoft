import type { Config } from 'jest';
// TODO migrate jest to vite (jasmine/karma)
const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  testMatch: ['**/*.spec.ts'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^@shared/models$': '<rootDir>/src/app/shared/models/index.ts',
    '^@shared/utils$': '<rootDir>/src/app/shared/utils/index.ts',
    '^@shared/ds/inputs/(.*)$': '<rootDir>/src/app/shared/ds/inputs/$1/index.ts',
    '^@shared/ds/(.*)$': '<rootDir>/src/app/shared/ds/$1/index.ts',
    '^@shared/ui-kit/(.*)$': '<rootDir>/src/app/shared/ui-kit/$1/index.ts',
    '^@shared/ui-pipes/(.*)$': '<rootDir>/src/app/shared/ui-pipes/$1/index.ts',
    '^@features/(.*)$': '<rootDir>/src/app/features/$1/index.ts',
    '^@core$': '<rootDir>/src/app/core/index.ts',
    '^@api/base$': '<rootDir>/src/app/api/base/index.ts',
    '^@api/config$': '<rootDir>/src/app/api/config/index.ts',
    '^@api/types$': '<rootDir>/src/app/api/types/index.ts',
    '^@api/controllers/(.*)$': '<rootDir>/src/app/api/controllers/$1/index.ts',
  },
};

export default config;
