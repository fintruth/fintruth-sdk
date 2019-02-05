'use strict'

module.exports = {
  overrides: [
    {
      files: ['**/*.ts', '.*/**/*.ts'],
      // A parsing error occurs when decorators are encountered
      rules: { '@typescript-eslint/no-unused-vars': 'off' },
    },
  ],
}
