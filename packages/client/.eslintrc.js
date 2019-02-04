'use strict'

const { eslintConfig } = require('@fintruth-sdk/scripts')
const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const cypressPlugin = require('eslint-plugin-cypress')
const jestPlugin = require('eslint-plugin-jest')
const prettierTypescriptConfig = require('eslint-config-prettier/@typescript-eslint')

module.exports = {
  extends: [
    'standard-react',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'prettier/react',
    ...eslintConfig.extends,
  ],
  globals: { __DEV__: false },
  overrides: [
    {
      files: ['**/*.ts?(x)', '.*/**/*.ts?(x)'],
      parser: typescriptPlugin.configs.recommended.parser,
      plugins: typescriptPlugin.configs.recommended.plugins,
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        ...prettierTypescriptConfig.rules,
        'no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['config/cypress/**/*.?(js|ts)', 'test/**/*.ts?(x)'],
      globals: cypressPlugin.environments.globals.globals,
      plugins: cypressPlugin.configs.recommended.plugins,
      rules: cypressPlugin.configs.recommended.rules,
    },
    {
      files: ['config/jest/**/*.?(js|ts)', 'src/**/?(*.)test.ts?(x)'],
      globals: { ...jestPlugin.environments.globals.globals, __DEV__: true },
      plugins: jestPlugin.configs.recommended.plugins,
      rules: jestPlugin.configs.recommended.rules,
    },
  ],
  plugins: ['jsx-a11y', 'react', ...eslintConfig.plugins],
  rules: eslintConfig.rules,
  settings: eslintConfig.settings,
}
