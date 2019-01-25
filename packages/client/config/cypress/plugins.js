'use strict'

const path = require('path')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

const ROOT_DIR = path.resolve(__dirname, '../..')

module.exports = on => {
  const options = {
    webpackOptions: {
      module: {
        rules: [
          { parser: { requireEnsure: false } },
          {
            oneOf: [
              {
                test: /\.ts(x)?$/,
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
    },
  }

  on('file:preprocessor', webpackPreprocessor(options))
}
