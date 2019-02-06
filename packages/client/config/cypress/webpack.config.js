'use strict'

const path = require('path')

const ROOT_DIR = path.resolve(__dirname, '..')

module.exports = {
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: /\.ts$/,
            include: [
              path.resolve(ROOT_DIR, 'config/cypress'),
              path.join(ROOT_DIR, 'test'),
            ],
            loader: require.resolve('babel-loader'),
            options: {
              cacheCompression: false,
              cacheDirectory: true,
              caller: { target: 'web' },
              compact: false,
            },
          },
        ],
      },
    ],
    strictExportPresence: true,
  },
  resolve: { extensions: ['.js', '.json', '.mjs', '.ts', '.tsx', '.wasm'] },
}
