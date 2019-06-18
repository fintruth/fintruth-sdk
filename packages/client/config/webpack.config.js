'use strict'

const LoadablePlugin = require('@loadable/webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { BannerPlugin, DefinePlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const nodeExternals = require('webpack-node-externals')

const rootDir = path.resolve(__dirname, '..')
const buildDir = path.join(rootDir, 'build')

const env = process.env.ENV || 'dev'
const isProd = /prod(uction)?/i.test(env)
const isStaging = /(stage|staging)/i.test(env)
const envFile = isProd ? '.env.prod' : isStaging ? '.env.staging' : '.env'

const isAnalyze = process.argv.includes('--analyze')
const isRelease = isProd || isStaging || process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

const createConfig = (target, configFactory) =>
  configFactory({
    bail: isRelease,
    cache: !isRelease,
    context: rootDir,
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
              include: [path.join(rootDir, 'src')],
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
      path: path.resolve(buildDir, 'public/assets'),
      pathinfo: isVerbose,
      publicPath: '/assets/',
    },
    plugins: [
      new DefinePlugin({
        'process.env.BROWSER': target === 'web',
        __DEV__: !isRelease,
      }),
      new DotenvPlugin({
        defaults: path.join(rootDir, '.env.defaults'),
        path: path.join(rootDir, envFile),
        safe: path.join(rootDir, '.env.example'),
      }),
    ],
    resolve: {
      alias: { react: path.resolve(rootDir, 'node_modules/react') },
      extensions: ['.js', '.json', '.mjs', '.ts', '.tsx', '.wasm'],
      modules: ['node_modules', path.join(rootDir, 'src')],
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
  entry: { client: path.resolve('./src/client.tsx') },
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
  entry: { server: path.resolve('./src/server.tsx') },
  externals: [nodeExternals({ whitelist: [/\.(bmp|gif|jp(e)?g|png|webp)$/] })],
  name: 'server',
  node: false,
  output: {
    ...baseConfig.output,
    chunkFilename: 'chunks/[name].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: buildDir,
  },
  plugins: [
    ...baseConfig.plugins,
    new BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true,
    }),
  ],
}))

module.exports = [clientConfig, serverConfig]
