module.exports = {
  collectCoverageFrom: [
    'packages/**/*.ts{,x}',
    '!packages/**/*.stories.ts{,x}',
  ],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  restoreMocks: true,
  setupTestFrameworkScriptFile: '<rootDir>/test/jest.setup.ts',
  testMatch: ['<rootDir>/packages/**/?(*.)test.ts?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
