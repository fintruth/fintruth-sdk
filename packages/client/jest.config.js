'use strict'

const jestConfig = require('../../config/jest.config')

module.exports = {
  ...jestConfig,
  collectCoverageFrom: ['src/**/*.ts?(x)', '!src/client.tsx'],
  setupTestFrameworkScriptFile: '<rootDir>/config/jest/setup.ts',
  transform: {
    '^(?!.*\\.(json|ts(x)?)$)': '<rootDir>/config/jest/file-transformer.js',
    '^.+\\.ts(x)?$': 'babel-jest',
  },
}
