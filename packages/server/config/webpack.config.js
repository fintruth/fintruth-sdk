const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const isRelease = process.argv.includes('--release')
const mode = isRelease ? 'production' : 'development'

const rootDir = path.resolve(__dirname, '..')

module.exports = {
  bail: isRelease,
  context: rootDir,
  devtool: isRelease ? 'source-map' : 'cheap-module-source-map',
  entry: './src/main.ts',
  target: 'node',
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(rootDir, '../../node_modules'),
    }),
  ],
  mode,
  optimization: {
    minimize: false,
  },
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
  resolve: {
    modules: [path.resolve(rootDir, 'src'), 'node_modules'],
    symlinks: false,
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.js', '.json'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(rootDir, 'build'),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${mode}'`,
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true,
    }),
  ],
}
