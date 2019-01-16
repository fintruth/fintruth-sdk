'use strict'

const { node } = require('./package.json').engines

const createConfig = ({ env }) => {
  const isEnvDev = env('development')
  const isEnvProd = env('production')
  const isEnvTest = env('test')

  return {
    env: {
      production: {
        plugins: [
          '@babel/transform-react-constant-elements',
          '@babel/transform-react-inline-elements',
        ],
      },
      test: {
        plugins: ['dynamic-import-node'],
      },
    },
    ignore: ['build', 'node_modules'],
    overrides: [
      {
        test: /src\/client\.tsx$/,
        presets: [
          ['@babel/preset-env', { modules: false, useBuiltIns: 'entry' }],
        ],
      },
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-transform-runtime', { corejs: 2, helpers: false }],
      '@loadable/babel-plugin',
      'graphql-tag',
      'polished',
      ['ramda', { useEs: true }],
      ['styled-components', { displayName: isEnvDev, pure: isEnvProd }],
    ],
    presets: [
      ['@babel/preset-env', { targets: { node: node.match(/(\d+\.?)+/)[0] } }],
      [
        '@babel/preset-react',
        { development: isEnvDev || isEnvTest, useBuiltIns: true },
      ],
      '@babel/preset-typescript',
    ],
  }
}

module.exports = createConfig
