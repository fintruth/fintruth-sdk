'use strict'

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
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
            options: { transpileOnly: true },
          },
        ],
      },
    ],
    strictExportPresence: true,
  },
  plugins: [new ForkTsCheckerPlugin()],
  resolve: { extensions: ['.js', '.json', '.mjs', '.ts', '.wasm'] },
}
