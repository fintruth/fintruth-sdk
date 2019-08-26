'use strict'

const mdxCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')
const { join, resolve } = require('path')
const { DefinePlugin } = require('webpack')

const rootDir = resolve(__dirname, '..')

module.exports = ({ config, mode }) => {
  const isDev = /dev(elopment)?/i.test(mode)
  const isProd = /prod(uction)?/i.test(mode)

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
                    cacheCompression: isProd,
                    cacheDirectory: true,
                    caller: { target: 'web' },
                    compact: isProd,
                  },
                },
                {
                  loader: require.resolve('@mdx-js/loader'),
                  options: { compilers: [mdxCompiler()] },
                },
              ],
            },
            {
              test: /\.svg$/,
              loader: require.resolve('@svgr/webpack'),
              options: { ref: true },
            },
            {
              test: /\.ts(x)?$/,
              include: [join(rootDir, '.storybook'), join(rootDir, 'src')],
              loader: require.resolve('babel-loader'),
              options: {
                cacheCompression: isProd,
                cacheDirectory: true,
                caller: { target: 'web' },
                compact: isProd,
              },
            },
          ],
        },
      ],
      strictExportPresence: true,
    },
    plugins: [
      ...config.plugins,
      new DefinePlugin({ __IS_BROWSER__: true, __IS_DEV__: isDev }),
    ],
    resolve: {
      ...config.resolve,
      extensions: ['.js', '.json', '.mjs', '.ts', '.tsx', '.wasm'],
      modules: ['node_modules', join(rootDir, 'src')],
    },
  }
}
