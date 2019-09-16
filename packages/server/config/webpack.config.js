'use strict'

const DotenvPlugin = require('dotenv-webpack')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const glob = require('glob')
const { basename, join, resolve } = require('path')
const { BannerPlugin, DefinePlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')

const rootDir = resolve(__dirname, '..')
const buildDir = join(rootDir, 'build')

const env = process.env.ENV || 'dev'
const isProd = /prod(uction)?/i.test(env)
const isStaging = /stag(e|ing)/i.test(env)
let envFile = '.env'

const isRelease = isProd || isStaging || process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

if (isProd) {
  envFile += '.prod'
} else if (isStaging) {
  envFile += '.staging'
}

const baseConfig = {
  bail: isRelease,
  cache: !isRelease,
  context: rootDir,
  devtool: isRelease ? 'source-map' : 'eval-source-map',
  externals: [
    nodeExternals({ modulesDir: join(rootDir, 'node_modules') }),
    nodeExternals({ modulesDir: resolve(rootDir, '../../node_modules') }),
  ],
  mode: isRelease ? 'production' : 'development',
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: /\.mjs$/,
            include: /[/\\\\]node_modules[/\\\\]/,
            type: 'javascript/auto',
          },
          {
            test: /\.ts$/,
            include: join(rootDir, 'src'),
            loader: require.resolve('ts-loader'),
            options: { transpileOnly: true },
          },
          {
            exclude: /\.((e|m)?js|json|ts)$/,
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
  optimization: { minimize: false },
  output: {
    chunkFilename: 'chunks/[name].js',
    devtoolModuleFilenameTemplate: ({ absoluteResourcePath }) =>
      resolve(absoluteResourcePath).replace(/\\/g, '/'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: buildDir,
    pathinfo: isVerbose,
  },
  resolve: {
    extensions: ['.js', '.json', '.mjs', '.ts', '.wasm'],
    modules: ['node_modules', join(rootDir, 'src')],
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
  target: 'node',
}

const migrationsConfig = {
  ...baseConfig,
  entry: glob
    .sync(resolve('./src/migrations/*.ts'))
    .reduce((acc, cur) => ({ ...acc, [basename(cur, '.ts')]: cur }), {}),
  output: {
    ...baseConfig.output,
    libraryTarget: 'umd',
    path: join(buildDir, 'migrations'),
  },
}

const seedsConfig = {
  ...baseConfig,
  entry: glob
    .sync(resolve('./src/seeds/*.ts'))
    .reduce((acc, cur) => ({ ...acc, [basename(cur, '.ts')]: cur }), {}),
  output: {
    ...baseConfig.output,
    libraryTarget: 'umd',
    path: join(buildDir, 'seeds'),
  },
}

const serverConfig = {
  ...baseConfig,
  entry: { main: resolve('./src/main.ts') },
  name: 'main',
  node: false,
  plugins: [
    new BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true,
    }),
    new DefinePlugin({
      'process.env.IS_BUNDLED': true,
      'process.env.NODE_ENV': isRelease ? '"production"' : '"development"',
    }),
    new DotenvPlugin({
      path: join(rootDir, envFile),
      safe: join(rootDir, '.env.example'),
      systemvars: true,
    }),
    new ForkTsCheckerPlugin(),
  ],
}

module.exports = [migrationsConfig, seedsConfig, serverConfig]
