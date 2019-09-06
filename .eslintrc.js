'use strict'

const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const prettierTypescriptConfig = require('eslint-config-prettier/@typescript-eslint')
const cypressPlugin = require('eslint-plugin-cypress')
const jestPlugin = require('eslint-plugin-jest')
const { join, resolve } = require('path')

const rootDir = resolve(__dirname)
const packagesDir = join(rootDir, 'packages')

module.exports = {
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
  overrides: [
    {
      files: ['**/*.ts?(x)', '**/.*/**/*.ts?(x)'],
      plugins: typescriptPlugin.configs.base.plugins,
      parser: typescriptPlugin.configs.base.parser,
      parserOptions: {
        project: [
          join(rootDir, 'tsconfig.json'),
          resolve(packagesDir, 'client/tsconfig.json'),
          resolve(packagesDir, 'common/tsconfig.json'),
          resolve(packagesDir, 'server/tsconfig.json'),
          resolve(packagesDir, 'validation/tsconfig.json'),
        ],
      },
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        ...typescriptPlugin.configs['recommended-requiring-type-checking']
          .rules,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        ...prettierTypescriptConfig.rules,
      },
    },
    {
      files: ['config/cypress/**/*.?(js|ts)', 'test/**/*.ts'],
      plugins: cypressPlugin.configs.recommended.plugins,
      globals: cypressPlugin.environments.globals.globals,
      rules: cypressPlugin.configs.recommended.rules,
    },
    {
      files: [
        'packages/*/config/jest/**/*.?(js|ts)',
        'packages/*/src/**/?(*.)test.ts?(x)',
      ],
      plugins: jestPlugin.configs.recommended.plugins,
      globals: jestPlugin.environments.globals.globals,
      rules: jestPlugin.configs.recommended.rules,
    },
  ],
  settings: { 'import/resolver': { typescript: true } },
}
