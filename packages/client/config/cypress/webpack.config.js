'use strict'

const path = require('path')

const rootDir = path.resolve(__dirname, '..')

module.exports = {
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: /\.ts$/,
            include: [
              path.resolve(rootDir, 'config/cypress'),
              path.join(rootDir, 'test'),
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
