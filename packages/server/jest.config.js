'use strict'

const { defaults } = require('jest-config')

module.exports = {
  collectCoverageFrom: ['src/**/*.ts', '!src/entities/*.ts'],
  coverageDirectory: 'coverage',
  errorOnDeprecated: true,
  moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/src'],
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup.ts'],
  testMatch: ['<rootDir>/src/**/*(*.)test.ts'],
  testRunner: 'jest-circus/runner',
  transform: { '^.+\\.ts$': require.resolve('ts-jest') },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
