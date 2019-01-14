'use strict'

module.exports = {
  errorOnDeprecated: true,
  moduleDirectories: ['<rootDir>/../../node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  restoreMocks: true,
  testMatch: ['<rootDir>/src/**/?(*.)test.ts?(x)'],
  testRunner: 'jest-circus/runner',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|ts(x)?)$'],
}
