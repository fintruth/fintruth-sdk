'use strict'

const path = require('path')
const DotenvPlugin = require('dotenv-webpack')
const LoadablePlugin = require('@loadable/webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const ROOT_DIR = path.resolve(__dirname, '..')
const BUILD_DIR = path.join(ROOT_DIR, 'build')

const isAnalyze = process.argv.includes('--analyze')
const isRelease = process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

const createConfig = (target, configFactory) =>
  configFactory({
    bail: isRelease,
    cache: !isRelease,
    context: ROOT_DIR,
    devtool: isRelease ? 'source-map' : 'eval-source-map',
    mode: isRelease ? 'production' : 'development',
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
              test: /\.mjs$/,
              include: /[/\\\\]node_modules[/\\\\]/,
              type: 'javascript/auto',
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
                cacheCompression: isRelease,
                cacheDirectory: true,
                caller: { target },
                compact: isRelease,
              },
            },
            ...(isRelease
              ? [
                  {
                    test: require.resolve('react-deep-force-update'),
                    loader: require.resolve('null-loader'),
                  },
                ]
              : []),
            {
              exclude: /\.((e|m)?js|json|ts(x)?)$/,
              loader: require.resolve('file-loader'),
              options: {
                name: isRelease
                  ? '[hash:8].[ext]'
                  : '[path][name].[ext]?[hash:8]',
              },
            },
          ],
        },
      ],
      strictExportPresence: true,
    },
    output: {
      chunkFilename: isRelease
        ? '[name].[chunkhash:8].chunk.js'
        : '[name].chunk.js',
      devtoolModuleFilenameTemplate: ({ absoluteResourcePath }) =>
        path.resolve(absoluteResourcePath).replace(/\\/g, '/'),
      filename: isRelease ? '[name].[chunkhash:8].js' : '[name].js',
      path: path.resolve(BUILD_DIR, 'public/assets'),
      pathinfo: isVerbose,
      publicPath: '/assets/',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BROWSER': target === 'web',
        __DEV__: !isRelease,
      }),
      new DotenvPlugin({
        path: path.join(ROOT_DIR, `.env${isRelease ? '' : '.local'}`),
        safe: path.join(ROOT_DIR, '.env.example'),
      }),
    ],
    resolve: {
      alias: {
        react: path.resolve(ROOT_DIR, '../../node_modules/react'),
        'react-dom': path.resolve(ROOT_DIR, '../../node_modules/react-dom'),
      },
      extensions: ['.js', '.json', '.mjs', '.ts', '.tsx', '.wasm'],
      modules: ['node_modules', path.join(ROOT_DIR, 'src')],
    },
    stats: {
      cached: isVerbose,
      cachedAssets: isVerbose,
      chunkModules: isVerbose,
      chunks: isVerbose,
      colors: true,
      hash: isVerbose,
      modules: isVerbose,
      reasons: !isRelease,
      timings: true,
      version: isVerbose,
    },
    target,
  })

const clientConfig = createConfig('web', baseConfig => ({
  ...baseConfig,
  entry: { client: './src/client.tsx' },
  name: 'client',
  optimization: {
    minimize: isRelease,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          mangle: { safari10: true },
          output: { ascii_only: true },
        },
      }),
    ],
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[/\\\\]node_modules[/\\\\]/,
          chunks: 'initial',
          name: 'vendors',
        },
      },
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    ...baseConfig.plugins,
    new LoadablePlugin({
      filename: 'stats.json',
      writeToDisk: { filename: 'build' },
    }),
    ...(isAnalyze && isRelease ? [new BundleAnalyzerPlugin()] : []),
  ],
}))

const serverConfig = createConfig('node', baseConfig => ({
  ...baseConfig,
  entry: { server: [require.resolve('isomorphic-fetch'), './src/server.tsx'] },
  externals: [nodeExternals({ whitelist: [/\.(bmp|gif|jp(e)?g|png|webp)$/] })],
  name: 'server',
  node: false,
  output: {
    ...baseConfig.output,
    chunkFilename: 'chunks/[name].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: BUILD_DIR,
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true,
    }),
  ],
}))

module.exports = [clientConfig, serverConfig]
