'use strict'

const { node } = require('./package.json').engines

const createConfig = ({ caller, env }) => {
  const isDev = env('development')
  const isProd = env('production')
  const isTest = env('test')

  return {
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-transform-runtime',
        { corejs: !isTest && 3, helpers: false },
      ],
      '@loadable/babel-plugin',
      'graphql-tag',
      ['ramda', { useEs: true }],
      ['styled-components', { displayName: isDev, pure: isProd }],
      ...(isProd
        ? [
            '@babel/transform-react-constant-elements',
            '@babel/transform-react-inline-elements',
          ]
        : []),
      ...(isTest ? ['dynamic-import-node'] : ['polished']),
    ],
    presets: [
      [
        '@babel/preset-env',
        caller(({ target = 'node' } = {}) => target === 'node')
          ? { targets: { node: node.match(/(\d+\.?)+/)[0] } }
          : { corejs: 3, modules: false, useBuiltIns: 'entry' },
      ],
      [
        '@babel/preset-react',
        { development: isDev || isTest, useBuiltIns: true },
      ],
      '@babel/preset-typescript',
    ],
    ignore: ['build', 'node_modules'],
  }
}

module.exports = createConfig
