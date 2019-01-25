'use strict'

const { defaults } = require('jest-config')

module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  errorOnDeprecated: true,
  moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/src'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  restoreMocks: true,
  testMatch: ['<rootDir>/src/**/?(*.)test.ts'],
  testRunner: 'jest-circus/runner',
  transform: { '^.+\\.ts(x)?$': require.resolve('ts-jest') },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
