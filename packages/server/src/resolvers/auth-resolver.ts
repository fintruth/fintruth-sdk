import { Inject } from 'typedi'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { Context } from 'apollo'
import {
  InitiateTwoFactorResponse,
  Response,
  ResponseError,
  UserResponse,
} from 'resolvers/types'
import { AuthService } from 'services'

@Resolver()
export default class AuthResolver {
  @Inject()
  authService: AuthService

  @Mutation(() => Response)
  async confirmTwoFactor(
    @Arg('token') token: string,
    @Ctx() { user }: Context
  ) {
    if (!user) {
      const error = new ResponseError('Not authenticated')

      return new Response({ error })
    }

    return this.authService.confirmTwoFactor(token, user.id)
  }

  @Mutation(() => Response)
  disableTwoFactor(@Arg('token') token: string, @Ctx() { user }: Context) {
    if (!user) {
      const error = new ResponseError('Not authenticated')

      return new Response({ error })
    }

    return this.authService.disableTwoFactor(token, user.id)
  }

  @Mutation(() => InitiateTwoFactorResponse)
  async initiateTwoFactor(@Ctx() { user }: Context) {
    if (!user) {
      const error = new ResponseError('Not authenticated')

      return new InitiateTwoFactorResponse({ error })
    }

    return this.authService.initiateTwoFactor(user.id)
  }

  @Mutation(() => UserResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ) {
    const user = await this.authService.authenticate(email, password)

    if (!user) {
      const error = new ResponseError('Incorrect email or password')

      return new UserResponse({ error })
    }

    this.authService.withNewAuthentication(res, user)

    return new UserResponse({ user })
  }

  @Mutation(() => Response)
  signOut(@Ctx() { res }: Context) {
    res.clearCookie('token-id')

    return new Response()
  }
}
