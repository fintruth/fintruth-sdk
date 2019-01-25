'use strict'

const path = require('path')
const { defaults } = require('jest-config')

module.exports = {
  collectCoverageFrom: ['src/**/*.ts?(x)', '!src/**/*.stories.tsx'],
  errorOnDeprecated: true,
  globals: { __DEV__: true },
  moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/src'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    '^react$': path.resolve(__dirname, 'node_modules/react'),
  },
  restoreMocks: true,
  setupTestFrameworkScriptFile: '<rootDir>/config/jest/setup.ts',
  testMatch: ['<rootDir>/src/**/?(*.)test.ts?(x)'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^(?!.*\\.(json|ts(x)?)$)': '<rootDir>/config/jest/file-transformer.js',
    '^.+\\.ts(x)?$': require.resolve('babel-jest'),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
