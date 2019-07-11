'use strict'

module.exports = {
  env: { browser: true },
  globals: { __DEV__: false },
  overrides: [
    {
      files: ['config/jest/**/*.?(js|ts)', 'src/**/?(*.)test.ts?(x)'],
      globals: { __DEV__: true },
    },
  ],
}
