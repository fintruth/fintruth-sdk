'use strict'

module.exports = {
  env: { browser: true },
  globals: { __IS_DEV__: false },
  overrides: [
    {
      files: [
        'config/jest/**/*.?(js|ts)',
        'src/**/__mocks__/**/*.ts',
        'src/**/?(*.)test.ts?(x)',
      ],
      globals: { __IS_DEV__: true },
    },
  ],
}
