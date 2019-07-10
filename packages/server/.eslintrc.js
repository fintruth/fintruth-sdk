'use strict'

module.exports = {
  overrides: [
    {
      files: ['src/migrations/**/*.ts'],
      rules: { 'unicorn/filename-case': 'off', 'prettier/prettier': 'off' },
    },
    {
      files: ['src/seeds/**/*.ts'],
      rules: { 'unicorn/filename-case': 'off' },
    },
  ],
}
