import webpack from 'webpack'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore TS7016
import webpackConfig from '../config/webpack.config'

const bundle = () =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig).run((error, stats) => {
      if (error) {
        return reject(error)
      }

      console.info(stats.toString(webpackConfig[0].stats))

      return stats.hasErrors()
        ? reject(new Error('Webpack compilation errors'))
        : resolve()
    })
  })

export default bundle
