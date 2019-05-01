'use strict'

const cypressPlugin = require('eslint-plugin-cypress')

module.exports = {
  env: { browser: true },
  globals: { __DEV__: false },
  overrides: [
    {
      files: ['config/cypress/**/*.?(js|ts)', 'test/**/*.ts?(x)'],
      globals: cypressPlugin.environments.globals.globals,
      plugins: cypressPlugin.configs.recommended.plugins,
      rules: cypressPlugin.configs.recommended.rules,
    },
    {
      files: ['config/jest/**/*.?(js|ts)', 'src/**/?(*.)test.ts?(x)'],
      globals: { __DEV__: true },
    },
  ],
}
