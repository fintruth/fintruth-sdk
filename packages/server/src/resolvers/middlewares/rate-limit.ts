import { getGraphQLRateLimiter } from 'graphql-rate-limit'
import { MiddlewareFn } from 'type-graphql'

import { Context } from 'apollo'

const rateLimiter = getGraphQLRateLimiter({
  identifyContext: ({ ip }: Context) => ip,
})

const RateLimit = (
  max: number,
  window: string
): MiddlewareFn<Context> => async ({ args, context, info, root }, next) => {
  const message = await rateLimiter(
    { args, context, info, parent: root },
    { max, window }
  )

  if (message) {
    throw new Error(message)
  }

  return next()
}

export default RateLimit
