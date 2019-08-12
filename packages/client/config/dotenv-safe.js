'use strict'

const { config } = require('dotenv-safe')
const { join, resolve } = require('path')

const rootDir = resolve(__dirname, '..')

config({ path: join(rootDir, '.env'), example: join(rootDir, '.env.example') })
