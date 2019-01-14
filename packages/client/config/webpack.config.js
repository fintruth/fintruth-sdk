'use strict'

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const ROOT_DIR = path.resolve(__dirname, '..')
const BUILD_DIR = path.resolve(ROOT_DIR, 'build')

const env = process.env.NODE_ENV
const isEnvDev = /dev(elopment)?/i.test(env)
const isEnvProd = /prod(uction)?/i.test(env)

const sharedConfig = {
  bail: isEnvProd,
  cache: isEnvDev,
  context: ROOT_DIR,
  devtool: isEnvDev ? 'eval-source-map' : 'source-map',
  mode: isEnvDev ? 'development' : 'production',
  module: {
    rules: [
      {
        parser: {
          requireEnsure: false,
        },
      },
      {
        oneOf: [
          {
            test: /\.(bmp|gif|jp(e)?g|png|webp)$/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: '[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.svg$/,
            loader: require.resolve('@svgr/webpack'),
          },
          {
            test: /\.ts(x)?$/,
            include: [
              path.resolve(ROOT_DIR, '.storybook'),
              path.resolve(ROOT_DIR, 'src'),
            ],
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              compact: isEnvProd,
              cacheCompression: isEnvProd,
            },
          },
          {
            exclude: /\.((e|m)?js|json|ts(x)?)$/,
            loader: require.resolve('file-loader'),
            options: {
              name: isEnvDev ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
            },
          },
        ],
      },
    ],
    strictExportPresence: true,
  },
  output: {
    path: BUILD_DIR,
  },
  resolve: {
    extensions: ['.js', '.json', '.mjs', '.ts', '.tsx', '.wasm'],
    modules: ['node_modules', 'src'],
  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunkModules: false,
    chunks: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: isEnvDev,
    timings: true,
    version: false,
  },
}

const clientConfig = {
  ...sharedConfig,
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    hot: true,
    watchContentBase: true,
  },
  entry: {
    client: './src/client.tsx',
  },
  name: 'client',
  optimization: {
    minimize: isEnvProd,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          mangle: {
            safari10: true,
          },
          output: {
            ascii_only: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: true,
  },
  plugins: [...(isEnvDev ? [new webpack.HotModuleReplacementPlugin()] : [])],
  target: 'web',
}

module.exports = [clientConfig]
