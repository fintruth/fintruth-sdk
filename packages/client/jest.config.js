'use strict'

const path = require('path')

module.exports = {
  collectCoverageFrom: ['src/**/*.ts?(x)', '!src/**/*.stories.tsx'],
  errorOnDeprecated: true,
  globals: {
    __DEV__: true,
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '^react$': path.resolve(__dirname, '../../node_modules/react'),
    '^react-dom$': path.resolve(__dirname, '../../node_modules/react-dom'),
  },
  restoreMocks: true,
  setupTestFrameworkScriptFile: '<rootDir>/config/jest/setup.ts',
  testMatch: ['<rootDir>/src/**/?(*.)test.ts?(x)'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^(?!.*\\.(json|ts(x)?)$)': '<rootDir>/config/jest/file-transformer.js',
    '^.+\\.ts(x)?$': 'babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
