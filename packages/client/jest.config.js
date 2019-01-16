module.exports = {
  collectCoverageFrom: ['src/**/*.ts?(x)', '!src/**/*.stories.tsx'],
  errorOnDeprecated: true,
  globals: {
    __DEV__: true,
  },
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  restoreMocks: true,
  setupTestFrameworkScriptFile: '<rootDir>/config/jest/setup.ts',
  testMatch: ['<rootDir>/src/**/?(*.)test.ts?(x)'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^(?!.*\\.(json|ts(x)?)$)': '<rootDir>/config/jest/file-transformer.js',
    '^.+\\.ts(x)?$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
