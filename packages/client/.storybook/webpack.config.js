'use strict'

const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')

const ROOT_DIR = path.resolve(__dirname, '..')

module.exports = ({ config, mode }) => {
  const isEnvDev = /dev(elopment)?/i.test(mode)
  const isEnvProd = /prod(uction)?/i.test(mode)

  return {
    ...config,
    module: {
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            {
              test: /\.(bmp|gif|jp(e)?g|png|webp)$/,
              loader: require.resolve('url-loader'),
              options: { limit: 10000, name: '[name].[hash:8].[ext]' },
            },
            {
              test: /\.mdx$/,
              use: [
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    cacheCompression: isEnvProd,
                    cacheDirectory: true,
                    caller: { target: 'web' },
                    compact: isEnvProd,
                  },
                },
                {
                  loader: require.resolve('@mdx-js/loader'),
                  options: { compilers: [createCompiler()] },
                },
              ],
            },
            {
              test: /\.svg$/,
              loader: require.resolve('@svgr/webpack'),
            },
            {
              test: /\.ts(x)?$/,
              include: [
                path.join(ROOT_DIR, '.storybook'),
                path.join(ROOT_DIR, 'src'),
              ],
              loader: require.resolve('babel-loader'),
              options: {
                cacheCompression: isEnvProd,
                cacheDirectory: true,
                caller: { target: 'web' },
                compact: isEnvProd,
              },
            },
          ],
        },
      ],
      strictExportPresence: true,
    },
    plugins: [
      ...config.plugins,
      new DefinePlugin({ 'process.env.BROWSER': true, __DEV__: isEnvDev }),
    ],
    resolve: {
      ...config.resolve,
      extensions: ['.js', '.json', '.mjs', '.ts', '.tsx', '.wasm'],
      modules: ['node_modules', path.join(ROOT_DIR, 'src')],
    },
  }
}
