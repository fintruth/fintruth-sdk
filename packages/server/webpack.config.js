const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const isDebug = !process.argv.includes('--release')

module.exports = {
  bail: false,
  context: path.resolve(__dirname),
  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
  entry: './src/main.ts',
  externals: [nodeExternals()],
  mode: isDebug ? 'development' : 'production',
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
  node: false,
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    symlinks: false,
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.js', '.json'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true,
    }),
  ],
  target: 'node',
}
