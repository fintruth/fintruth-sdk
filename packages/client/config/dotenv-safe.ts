import { config } from 'dotenv-safe'
import { join, resolve } from 'path'

const rootDir = resolve(__dirname, '..')

config({ path: join(rootDir, '.env'), example: join(rootDir, '.env.example') })
