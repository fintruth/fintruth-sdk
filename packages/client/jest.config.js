'use strict'

const { defaults } = require('jest-config')

module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts?(x)',
    '!src/**/?(*.)stories.tsx',
    '!src/components/**/graphql.ts',
    '!src/components/html/index.ts',
    '!src/translations/*.ts',
    '!src/apollo.ts',
    '!src/client.tsx',
    '!src/config.ts',
    '!src/schema.ts',
    '!src/server.tsx',
  ],
  coverageDirectory: 'coverage',
  errorOnDeprecated: true,
  globals: { __IS_DEV__: true },
  moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/build'],
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup.ts'],
  snapshotResolver: '<rootDir>/config/jest/snapshot-resolver.js',
  testMatch: ['<rootDir>/src/**/*(*.)test.ts?(x)'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^(?!.*\\.(js|json|ts(x)?)$)': '<rootDir>/config/jest/file-transformer.js',
    '^.+\\.ts(x)?$': require.resolve('babel-jest'),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
