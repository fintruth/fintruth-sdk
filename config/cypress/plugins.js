'use strict'

const webpackPreprocessor = require('@cypress/webpack-preprocessor')

const webpackConfig = require('./webpack.config')

const configurePlugins = (on) => {
  on(
    'file:preprocessor',
    webpackPreprocessor({ webpackOptions: webpackConfig })
  )
}

module.exports = configurePlugins
