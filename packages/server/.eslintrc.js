'use strict'

module.exports = {
  overrides: [
    {
      files: ['src/?(migrations|seeds)/*.ts'],
      rules: { 'unicorn/filename-case': 'off' },
    },
  ],
}
