import Router from 'koa-router'

export const router = new Router()

router.get('/', (ctx: unknown) => ({
  ...ctx,
  body: 'It works!',
}))
