import { MiddlewareFn } from 'type-graphql'

import { Context } from 'apollo'

type RateLimitFn = (data: Data, args: Options) => Promise<string | undefined>
interface Data {
  args: Record<string, any>
  context: any
  info: any
  parent: any
}

interface Options {
  message?: string
  window?: string
  max?: number
  identityArgs?: readonly string[]
  arrayLengthField?: string
}

export const createRateLimitMiddleware = (
  rateLimiter: RateLimitFn,
  opts: Options
): MiddlewareFn<Context> => async ({ args, context, info, root }, next) => {
  const error = await rateLimiter({ args, context, info, parent: root }, opts)

  if (error) {
    throw new Error(error)
  }

  return next()
}
