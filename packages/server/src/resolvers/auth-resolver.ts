import { Inject } from 'typedi'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { Context } from 'apollo'
import {
  InitiateTwoFactorResponse,
  Response,
  ResponseError,
  UserResponse,
} from 'resolvers/types'
import { AuthService, UserService } from 'services'

@Resolver()
export default class AuthResolver {
  @Inject()
  authService: AuthService

  @Inject()
  userService: UserService

  @Mutation(() => Response)
  async confirmTwoFactor(
    @Arg('token') token: string,
    @Ctx() { user }: Context
  ) {
    if (!user) {
      return new Response({ error: new ResponseError('Not authenticated') })
    }

    return this.authService.confirmTwoFactor(token, user.id)
  }

  @Mutation(() => Response)
  disableTwoFactor(@Arg('token') token: string, @Ctx() { user }: Context) {
    if (!user) {
      return new Response({ error: new ResponseError('Not authenticated') })
    }

    return this.authService.disableTwoFactor(token, user.id)
  }

  @Mutation(() => InitiateTwoFactorResponse)
  async initiateTwoFactor(@Ctx() { user }: Context) {
    if (!user) {
      return new InitiateTwoFactorResponse({
        error: new ResponseError('Not authenticated'),
      })
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
      return new UserResponse({
        error: new ResponseError('Incorrect email or password'),
      })
    }

    if (!user.isTwoFactorEnabled) {
      this.authService.signAuthToken(res, user)
    }

    return new UserResponse({ user })
  }

  @Mutation(() => UserResponse)
  async signInTwoFactor(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('token') token: string,
    @Ctx() { res }: Context
  ) {
    const user = await this.authService.authenticate(email, password)

    if (!user) {
      return new UserResponse({
        error: new ResponseError('Incorrect email or password'),
      })
    }

    const isValid =
      user.secret && this.authService.verifyTwoFactorToken(token, user.secret)

    if (!isValid) {
      return new UserResponse({
        error: new ResponseError('Token is invalid or expired'),
      })
    }

    this.authService.signAuthToken(res, user)

    return new UserResponse({ user })
  }

  @Mutation(() => Response)
  signOut(@Ctx() { res }: Context) {
    res.clearCookie('token-id')

    return new Response()
  }
}
