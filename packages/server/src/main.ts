import Koa from 'koa'
import { initializeDatabase } from 'database'

const bootstrap = async (): Promise<void> => {
  await initializeDatabase()

  const app = new Koa()

  app.use(async ctx => {
    ctx.body = 'It works!\n'
  })

  app.listen(3000)
}

bootstrap()
