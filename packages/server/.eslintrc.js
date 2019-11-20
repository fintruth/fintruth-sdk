'use strict'

module.exports = {
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
  },
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
