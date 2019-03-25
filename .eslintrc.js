'use strict'

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
  overrides: [
    {
      files: ['**/*.ts?(x)', '**/.*/**/*.ts?(x)'],
      parser: typescriptPlugin.configs.recommended.parser,
      plugins: typescriptPlugin.configs.recommended.plugins,
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        'no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        ...prettierTypescriptConfig.rules,
      },
    },
    {
      files: [
        'packages/*/config/jest/**/*.?(js|ts)',
        'packages/*/src/**/?(*.)test.ts?(x)',
      ],
      globals: jestPlugin.environments.globals.globals,
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
    'import/order': [
      'error',
      { groups: [['builtin', 'external']], 'newlines-between': 'always' },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 'error',
  },
  settings: { 'import/resolver': { typescript: true } },
}
