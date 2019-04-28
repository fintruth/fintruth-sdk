const glob = require('glob')
const path = require('path')
const DotenvPlugin = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const isRelease = process.argv.includes('--release')
const mode = isRelease ? 'production' : 'development'

const rootDir = path.resolve(__dirname, '..')
const buildDir = path.resolve(rootDir, 'build')

const baseConfig = {
  bail: isRelease,
  context: rootDir,
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(rootDir, '../../node_modules'),
    }),
  ],
  mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    modules: [path.resolve(rootDir, 'src'), 'node_modules'],
    symlinks: false,
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.js', '.json'],
  },
  target: 'node',
}

const serverConfig = {
  ...baseConfig,
  devtool: isRelease ? 'source-map' : 'cheap-module-source-map',
  entry: './src/main.ts',
  output: {
    filename: '[name].js',
    path: buildDir,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${mode}'`,
    }),
    new DotenvPlugin({
      path: path.join(rootDir, `.env${isRelease ? '.prod' : '.local'}`),
      safe: path.join(rootDir, '.env.example'),
      systemvars: true,
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true,
    }),
  ],
}

const migrationsConfig = {
  ...baseConfig,
  entry: glob
    .sync(path.resolve('src/migrations/*.ts'))
    .reduce((entries, filename) => {
      const migrationName = path.basename(filename, '.ts')
      return Object.assign({}, entries, {
        [migrationName]: filename,
      })
    }, {}),
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    path: path.join(buildDir, 'migrations'),
  },
}

const seedsConfig = {
  ...baseConfig,
  entry: glob
    .sync(path.resolve('src/seeds/*.ts'))
    .reduce((entries, filename) => {
      const seedsName = path.basename(filename, '.ts')
      return Object.assign({}, entries, {
        [seedsName]: filename,
      })
    }, {}),
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    path: path.join(buildDir, 'seeds'),
  },
}

module.exports = [serverConfig, migrationsConfig, seedsConfig]
