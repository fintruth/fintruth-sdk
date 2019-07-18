'use strict'

const path = require('path')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const rootDir = path.resolve(__dirname, '../..')

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
