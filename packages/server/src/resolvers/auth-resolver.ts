import {
  Arg,
  Authorized as Authenticated,
  Ctx,
  Mutation,
  Resolver,
} from 'type-graphql'
import { Inject } from 'typedi'

import { Context } from 'apollo'
import {
  EnableTwoFactorAuthResponse,
  Response,
  ResponseError,
  UserResponse,
} from 'resolvers/types'
import { AuthService } from 'services'

@Resolver()
export default class AuthResolver {
  @Inject()
  private readonly authService: AuthService

  @Authenticated()
  @Mutation(() => Response)
  confirmTwoFactorAuth(@Arg('token') token: string, @Ctx() { user }: Context) {
    return user && this.authService.confirmTwoFactorAuth(token, user.id)
  }

  @Authenticated()
  @Mutation(() => Response)
  disableTwoFactorAuth(@Arg('token') token: string, @Ctx() { user }: Context) {
    return user && this.authService.disableTwoFactorAuth(token, user.id)
  }

  @Authenticated()
  @Mutation(() => EnableTwoFactorAuthResponse)
  enableTwoFactorAuth(@Ctx() { user }: Context) {
    return user && this.authService.enableTwoFactorAuth(user.id)
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
