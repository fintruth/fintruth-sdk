'use strict'

module.exports = {
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
  },
  overrides: [
    {
      files: ['src/?(migrations|seeds)/**/*.ts'],
      rules: { 'unicorn/filename-case': 'off' },
    },
  ],
}
