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
  SignInResponse,
} from 'resolvers/types'
import { AuthService } from 'services'

@Resolver()
export default class AuthResolver {
  @Inject()
  private readonly authService: AuthService

  @Authenticated()
  @Mutation(() => Response)
  confirmTwoFactorAuth(
    @Arg('token') token: string,
    @Ctx() { ability, user }: Context
  ) {
    return (
      user && this.authService.confirmTwoFactorAuth(token, user.id, ability)
    )
  }

  @Authenticated()
  @Mutation(() => Response)
  disableTwoFactorAuth(
    @Arg('token') token: string,
    @Ctx() { ability, user }: Context
  ) {
    return (
      user && this.authService.disableTwoFactorAuth(token, user.id, ability)
    )
  }

  @Authenticated()
  @Mutation(() => EnableTwoFactorAuthResponse)
  enableTwoFactorAuth(@Ctx() { ability, user }: Context) {
    return user && this.authService.enableTwoFactorAuth(user.id, ability)
  }

  @Mutation(() => SignInResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ) {
    return this.authService.authenticate(email, password, res)
  }

  @Mutation(() => Response)
  async signInTwoFactorAuth(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('token') token: string,
    @Ctx() { res }: Context
  ) {
    return this.authService.authenticateTwoFactor(email, password, token, res)
  }

  @Mutation(() => Response)
  signOut(@Ctx() { res }: Context) {
    res.clearCookie('token-id')

    return new Response()
  }
}
