'use strict'

const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const prettierTypescriptConfig = require('eslint-config-prettier/@typescript-eslint')
const cypressPlugin = require('eslint-plugin-cypress')
const jestPlugin = require('eslint-plugin-jest')
const path = require('path')

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
      parser: typescriptPlugin.configs.base.parser,
      parserOptions: {
        project: [
          path.resolve(__dirname, './tsconfig.json'),
          path.resolve(__dirname, './packages/client/tsconfig.json'),
          path.resolve(__dirname, './packages/common/tsconfig.json'),
          path.resolve(__dirname, './packages/server/tsconfig.json'),
          path.resolve(__dirname, './packages/validation/tsconfig.json'),
        ],
      },
      plugins: typescriptPlugin.configs.base.plugins,
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        ...typescriptPlugin.configs['recommended-requiring-type-checking']
          .rules,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_' },
        ],
        ...prettierTypescriptConfig.rules,
      },
    },
    {
      files: ['config/cypress/**/*.?(js|ts)', 'test/**/*.ts'],
      globals: cypressPlugin.environments.globals.globals,
      plugins: cypressPlugin.configs.recommended.plugins,
      rules: cypressPlugin.configs.recommended.rules,
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
    'unicorn/prevent-abbreviations': 'off',
    'prettier/prettier': 'error',
  },
  settings: { 'import/resolver': { typescript: true } },
}
