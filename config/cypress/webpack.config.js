'use strict'

const { join, resolve } = require('path')

const rootDir = resolve(__dirname, '../..')

module.exports = {
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: /\.ts$/,
            include: [
              resolve(rootDir, 'config/cypress'),
              join(rootDir, 'test'),
            ],
            loader: require.resolve('ts-loader'),
          },
        ],
      },
    ],
    strictExportPresence: true,
  },
  resolve: { extensions: ['.js', '.json', '.mjs', '.ts', '.wasm'] },
}
