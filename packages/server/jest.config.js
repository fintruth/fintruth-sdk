'use strict'

const jestConfig = require('../../config/jest.config')

module.exports = {
  ...jestConfig,
  collectCoverageFrom: ['src/**/*.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}
