'use strict'

const cypressPlugin = require('eslint-plugin-cypress')
const jestPlugin = require('eslint-plugin-jest')
const prettierTypescriptConfig = require('eslint-config-prettier/@typescript-eslint')
const typescriptPlugin = require('@typescript-eslint/eslint-plugin')

module.exports = {
  extends: [
    'standard',
    'standard-react',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:monorepo/recommended',
    'plugin:promise/recommended',
    'plugin:ramda/recommended',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'prettier/unicorn',
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
  plugins: [
    'import',
    'jsx-a11y',
    'monorepo',
    'prettier',
    'promise',
    'ramda',
    'react',
    'react-hooks',
    'standard',
    'unicorn',
  ],
  rules: {
    'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
    'no-param-reassign': ['error', { props: true }],
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 'error',
  },
  settings: { 'import/resolver': { typescript: true } },
}
