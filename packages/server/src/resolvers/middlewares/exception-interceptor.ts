import { anyPass, is } from 'ramda'
import { MiddlewareFn } from 'type-graphql'

import { Context } from 'apollo'
import { Response, ResponseError } from 'resolvers/types'

const ExceptionInterceptor = (
  constructors: Function[] // eslint-disable-next-line unicorn/consistent-function-scoping
): MiddlewareFn<Context> => async (_, next) => {
  try {
    return await next()
  } catch (error) {
    const isFilteredType = anyPass(
      constructors.map((constructor) => is(constructor))
    )

    if (isFilteredType(error)) {
      return new Response({ error: new ResponseError(error.message) })
    }

    throw new Error(error.message)
  }
}

export default ExceptionInterceptor
