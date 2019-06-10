'use strict'

const DotenvPlugin = require('dotenv-webpack')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const glob = require('glob')
const path = require('path')
const { BannerPlugin, DefinePlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')

const rootDir = path.resolve(__dirname, '..')
const buildDir = path.join(rootDir, 'build')

const env = process.env.NODE_ENV || 'development'
const isEnvProd = /prod(uction)?/i.test(env)
const isEnvStaging = /staging/i.test(env)

const isRelease =
  isEnvProd || isEnvStaging || process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

const envExt =
  isEnvProd || isRelease ? 'prod' : isEnvStaging ? 'staging' : 'dev'

const baseConfig = {
  bail: isRelease,
  cache: !isRelease,
  context: rootDir,
  devtool: isRelease ? 'source-map' : 'eval-source-map',
  externals: [
    nodeExternals(),
    nodeExternals({ modulesDir: path.resolve(rootDir, '../../node_modules') }),
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
            include: [path.join(rootDir, 'src')],
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
  output: {
    chunkFilename: 'chunks/[name].js',
    devtoolModuleFilenameTemplate: ({ absoluteResourcePath }) =>
      path.resolve(absoluteResourcePath).replace(/\\/g, '/'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: buildDir,
    pathinfo: isVerbose,
  },
  resolve: {
    extensions: ['.js', '.json', '.mjs', '.ts', '.wasm'],
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
  target: 'node',
}

const migrationsConfig = {
  ...baseConfig,
  entry: glob
    .sync(path.resolve('./src/migrations/*.ts'))
    .reduce((acc, cur) => ({ ...acc, [path.basename(cur, '.ts')]: cur }), {}),
  optimization: { minimize: false },
  output: {
    ...baseConfig.output,
    libraryTarget: 'umd',
    path: path.join(buildDir, 'migrations'),
  },
}

const seedsConfig = {
  ...baseConfig,
  entry: glob
    .sync(path.resolve('./src/seeds/*.ts'))
    .reduce((acc, cur) => ({ ...acc, [path.basename(cur, '.ts')]: cur }), {}),
  optimization: { minimize: false },
  output: {
    ...baseConfig.output,
    libraryTarget: 'umd',
    path: path.join(buildDir, 'seeds'),
  },
}

const serverConfig = {
  ...baseConfig,
  entry: { main: path.resolve('./src/main.ts') },
  name: 'main',
  node: false,
  plugins: [
    new BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true,
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': isRelease ? '"production"' : '"development"',
    }),
    new DotenvPlugin({
      path: path.join(rootDir, `.env.${envExt}`),
      safe: path.join(rootDir, '.env.example'),
    }),
    new ForkTsCheckerPlugin(),
  ],
}

module.exports = [migrationsConfig, seedsConfig, serverConfig]
