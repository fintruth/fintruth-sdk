'use strict'

const { defaults } = require('jest-config')

module.exports = {
  collectCoverageFrom: ['src/**/*.ts', '!src/entities'],
  coverageDirectory: 'coverage',
  errorOnDeprecated: true,
  moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/src'],
  restoreMocks: true,
  setupFiles: ['<rootDir>/config/jest-setup.js'],
  testMatch: ['<rootDir>/src/**/?(*.)test.ts'],
  testRunner: 'jest-circus/runner',
  transform: { '^.+\\.ts$': require.resolve('ts-jest') },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
