'use strict'

module.exports = {
  env: { browser: true },
  globals: { __IS_BROWSER__: false, __IS_DEV__: false },
  overrides: [
    {
      files: ['config/jest/**/*.?(js|ts)', 'src/**/?(*.)test.ts?(x)'],
      globals: { __IS_DEV__: true },
    },
  ],
}
