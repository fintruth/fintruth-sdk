'use strict'

module.exports = {
  overrides: [
    {
      files: ['src/**/*.ts'],
      rules: { 'no-useless-constructor': 'off' },
    },
    {
      files: ['src/?(migrations|seeds)/**/*.ts'],
      rules: { 'unicorn/filename-case': 'off' },
    },
  ],
}
