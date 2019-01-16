module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  errorOnDeprecated: true,
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  restoreMocks: true,
  testMatch: ['<rootDir>/src/**/?(*.)test.ts?(x)'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts(x)?$': 'ts-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
