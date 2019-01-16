'use strict'

const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')

module.exports = (_, env, defaultConfig) => ({
  ...defaultConfig,
  module: {
    ...defaultConfig.module,
    ...webpackConfig[0].module,
  },
  plugins: [
    ...defaultConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      __DEV__: /dev(elopment)?/i.test(env),
    }),
  ],
  resolve: {
    ...defaultConfig.resolve,
    ...webpackConfig[0].resolve,
  },
})
