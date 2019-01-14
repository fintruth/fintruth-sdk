const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')

module.exports = (baseConfig, env, defaultConfig) => {
  const isEnvDev = /dev(elopment)?/i.test(env)

  return {
    ...defaultConfig,

    module: {
      ...defaultConfig.module,
      ...webpackConfig[0].module,
    },

    plugins: [
      ...defaultConfig.plugins,
      new webpack.DefinePlugin({
        'process.env.BROWSER': true,
        __DEV__: isEnvDev,
      }),
    ],

    resolve: {
      ...defaultConfig.resolve,
      ...webpackConfig[0].resolve,
    },
  }
}
