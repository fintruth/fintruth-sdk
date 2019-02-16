import { Inject } from 'typedi'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { Context } from 'apollo'
import {
  EnableTwoFactorAuthResponse,
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
  confirmTwoFactorAuth(@Arg('token') token: string, @Ctx() { user }: Context) {
    if (!user) {
      return new Response({ error: new ResponseError('Not authenticated') })
    }

    return this.authService.confirmTwoFactorAuth(token, user.id)
  }

  @Mutation(() => Response)
  disableTwoFactorAuth(@Arg('token') token: string, @Ctx() { user }: Context) {
    if (!user) {
      return new Response({ error: new ResponseError('Not authenticated') })
    }

    return this.authService.disableTwoFactorAuth(token, user.id)
  }

  @Mutation(() => EnableTwoFactorAuthResponse)
  enableTwoFactorAuth(@Ctx() { user }: Context) {
    if (!user) {
      return new EnableTwoFactorAuthResponse({
        error: new ResponseError('Not authenticated'),
      })
    }

    return this.authService.enableTwoFactorAuth(user.id)
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

    if (!user.isTwoFactorAuthEnabled) {
      this.authService.signAuthToken(res, user)
    }

    return new UserResponse({ user })
  }

  @Mutation(() => UserResponse)
  async signInTwoFactorAuth(
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
      user.secret &&
      this.authService.verifyTwoFactorAuthToken(token, user.secret)

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
