const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const isRelease = process.argv.includes('--release')
const mode = isRelease ? 'production' : 'development'

module.exports = {
  bail: isRelease,
  devtool: isRelease ? 'source-map' : 'cheap-module-source-map',
  entry: './src/main.ts',
  target: 'node',
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules')
    })],
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
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    symlinks: false,
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.js', '.json'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
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
