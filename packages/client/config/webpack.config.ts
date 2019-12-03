import LoadablePlugin from '@loadable/webpack-plugin'
import DotenvPlugin from 'dotenv-webpack'
import { join, resolve } from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration, BannerPlugin, DefinePlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import nodeExternals from 'webpack-node-externals'

type ConfigFactory = (config: Configuration) => Configuration

type Target =
  | 'async-node'
  | 'atom'
  | 'electron-main'
  | 'electron-renderer'
  | 'electron'
  | 'node-webkit'
  | 'node'
  | 'web'
  | 'webworker'
  | ((compiler?: any) => void)

const rootDir = resolve(__dirname, '..')
const buildDir = join(rootDir, 'build')

const env = process.env.ENV || 'dev'
const isProd = /prod(uction)?/i.test(env)
const isStaging = /stag(e|ing)/i.test(env)
const envFile = isProd ? '.env.prod' : isStaging ? '.env.staging' : '.env'

const isAnalyze = process.argv.includes('--analyze')
const isRelease = isProd || isStaging || process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

const createConfig = (target: Target, configFactory: ConfigFactory) =>
  configFactory({
    bail: isRelease,
    cache: !isRelease,
    context: rootDir,
    devtool: isRelease ? 'source-map' : 'eval-source-map',
    mode: isRelease ? 'production' : 'development',
    module: {
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            {
              test: /\.(bmp|gif|jp(e)?g|png|webp)$/,
              loader: require.resolve('url-loader'),
              options: { limit: 10000, name: '[name].[hash:8].[ext]' },
            },
            {
              test: /\.css$/,
              include: /[/\\]node_modules[/\\]/,
              rules: [
                {
                  issuer: { not: [/\.css$/] },
                  loader: require.resolve('isomorphic-style-loader'),
                },
                {
                  loader: require.resolve('css-loader'),
                  options: { sourceMap: isRelease },
                },
              ],
            },
            {
              test: /\.mjs$/,
              include: /[/\\]node_modules[/\\]/,
              type: 'javascript/auto',
            },
            {
              test: /\.svg$/,
              loader: require.resolve('@svgr/webpack'),
              options: { ref: true },
            },
            {
              test: /\.ts(x)?$/,
              include: join(rootDir, 'src'),
              loader: require.resolve('babel-loader'),
              options: {
                cacheCompression: isRelease,
                cacheDirectory: true,
                caller: { target },
                compact: isRelease,
              },
            },
            ...(isRelease
              ? [
                  {
                    test: require.resolve('react-deep-force-update'),
                    loader: require.resolve('null-loader'),
                  },
                ]
              : []),
            {
              exclude: /\.((e|m)?js|json|ts(x)?)$/,
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
      chunkFilename: isRelease
        ? '[name].[chunkhash:8].chunk.js'
        : '[name].chunk.js',
      devtoolModuleFilenameTemplate: ({ absoluteResourcePath }) =>
        resolve(absoluteResourcePath).replace(/\\/g, '/'),
      filename: isRelease ? '[name].[chunkhash:8].js' : '[name].js',
      path: resolve(buildDir, 'public/assets'),
      pathinfo: isVerbose,
      publicPath: '/assets/',
    },
    plugins: [
      new DefinePlugin({
        __IS_DEV__: !isRelease,
        ...(target === 'web' ? { 'process.env.BROWSER_ENV': `'${env}'` } : {}),
      }),
      new DotenvPlugin({
        path: join(rootDir, envFile),
        safe: join(rootDir, '.env.example'),
        systemvars: true,
      }),
    ],
    resolve: {
      extensions: ['.js', '.json', '.mjs', '.ts', '.tsx', '.wasm'],
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
    target,
  })

const clientConfig = createConfig('web', baseConfig => ({
  ...baseConfig,
  entry: { client: resolve('./src/client.tsx') },
  name: 'client',
  optimization: {
    minimize: isRelease,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          mangle: { safari10: true },
          output: { ascii_only: true }, // eslint-disable-line @typescript-eslint/camelcase
        },
      }),
    ],
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[/\\]node_modules[/\\]/,
          chunks: 'initial',
          name: 'vendors',
        },
      },
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    ...(baseConfig.plugins || []),
    new LoadablePlugin({
      filename: 'stats.json',
      writeToDisk: { filename: 'build' },
    }),
    ...(isAnalyze && isRelease ? [new BundleAnalyzerPlugin()] : []),
  ],
}))

const serverConfig = createConfig('node', baseConfig => ({
  ...baseConfig,
  entry: { server: resolve('./src/server.tsx') },
  externals: [
    nodeExternals({
      modulesDir: join(rootDir, 'node_modules'),
      whitelist: [/\.(bmp|css|gif|jp(e)?g|png|webp)$/],
    }),
    nodeExternals({
      modulesDir: resolve(rootDir, '../../node_modules'),
      whitelist: [/\.(bmp|css|gif|jp(e)?g|png|webp)$/],
    }),
  ],
  name: 'server',
  node: false,
  output: {
    ...baseConfig.output,
    chunkFilename: 'chunks/[name].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: buildDir,
  },
  plugins: [
    ...(baseConfig.plugins || []),
    new BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true,
    }),
  ],
}))

export default [clientConfig, serverConfig]
