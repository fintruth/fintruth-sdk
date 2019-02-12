import { Inject } from 'typedi'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { Context } from 'apollo'
import {
  InitiateTwoFactorResponse,
  Response,
  ResponseError,
  SignInResponse,
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

  @Mutation(() => SignInResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ) {
    const user = await this.authService.authenticate(email, password)

    if (!user) {
      return new SignInResponse({
        error: new ResponseError('Incorrect email or password'),
      })
    }

    this.authService.withNewAuthentication(res, user, false)

    return new SignInResponse({
      isTwoFactorEnabled: user.isTwoFactorEnabled,
      ...(user.isTwoFactorEnabled ? {} : { user }),
    })
  }

  @Mutation(() => SignInResponse)
  async signInOtp(
    @Arg('token') token: string,
    @Ctx() { res, signInUser }: Context
  ) {
    if (!signInUser) {
      return new SignInResponse({
        error: new ResponseError('Not authenticated'),
      })
    }

    const isValid = this.authService.verifyTwoFactorToken(
      token,
      signInUser.secret
    )

    if (!isValid) {
      return new SignInResponse({
        error: new ResponseError('Token is invalid or expired'),
      })
    }

    this.authService.withNewAuthentication(res, signInUser, true)

    return new SignInResponse({ user: signInUser })
  }

  @Mutation(() => Response)
  signOut(@Ctx() { res }: Context) {
    res.clearCookie('token-id')

    return new Response()
  }
}
