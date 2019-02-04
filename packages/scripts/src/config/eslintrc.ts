import jestPlugin from 'eslint-plugin-jest'
import prettierTypescriptConfig from 'eslint-config-prettier/@typescript-eslint'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'

export default {
  extends: [
    'standard',
    'plugin:import/recommended',
    'plugin:monorepo/recommended',
    'plugin:promise/recommended',
    'plugin:ramda/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/standard',
    'prettier/unicorn',
  ],
  overrides: [
    {
      files: ['**/*.ts', '.*/**/*.ts'],
      parser: typescriptPlugin.configs.recommended.parser,
      plugins: typescriptPlugin.configs.recommended.plugins,
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        ...prettierTypescriptConfig.rules,
        'no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['config/jest/**/*.?(js|ts)', 'src/**/?(*.)test.ts'],
      globals: jestPlugin.environments.globals.globals,
      plugins: jestPlugin.configs.recommended.plugins,
      rules: jestPlugin.configs.recommended.rules,
    },
  ],
  plugins: [
    'import',
    'monorepo',
    'prettier',
    'promise',
    'ramda',
    'standard',
    'unicorn',
  ],
  rules: {
    'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
    'no-param-reassign': ['error', { props: true }],
    'prettier/prettier': 'error',
  },
  settings: { 'import/resolver': { typescript: true } },
}
