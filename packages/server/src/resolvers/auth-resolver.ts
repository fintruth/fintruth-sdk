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

  @Mutation(() => SignInResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ) {
    const user = await this.authService.authenticate(email, password)

    if (!user) {
      const error = new ResponseError('Incorrect email or password')

      return new SignInResponse({ error })
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
      const error = new ResponseError('Not authenticated')

      return new SignInResponse({ error })
    }

    const isValid = this.authService.verifyTwoFactorToken(
      token,
      signInUser.secret
    )

    if (!isValid) {
      const error = new ResponseError('Token is invalid or expired')

      return new SignInResponse({ error })
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
