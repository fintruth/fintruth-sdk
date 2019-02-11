import jwt from 'jsonwebtoken'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { GraphQLBoolean } from 'graphql'
import { Inject } from 'typedi'

import { Context } from 'apollo'
import { secret } from 'config'
import {
  InitiateTwoFactorResponse,
  RegisterInput,
  Response,
  ResponseError,
  UserResponse,
} from 'resolvers/types'
import { AuthService } from 'services'

@Resolver()
export default class AuthResolver {
  @Inject()
  authService: AuthService

  @Mutation(() => UserResponse)
  async confirmRegistration(@Arg('token') token: string) {
    return this.authService.confirmRegistration(token)
  }

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

    const expiresIn = 60 * 60 * 24 * 180
    const token = jwt.sign({ id: user.id }, secret, { expiresIn })

    res.cookies.set('token-id', token, {
      httpOnly: true,
      maxAge: expiresIn * 1000,
      signed: false,
    })

    return new UserResponse({ user })
  }

  @Mutation(() => GraphQLBoolean)
  signOut(@Ctx() { res }: Context) {
    res.clearCookie('token-id')

    return true
  }

  @Mutation(() => Response)
  async register(@Arg('input') { email, password }: RegisterInput) {
    return this.authService.register(email, password)
  }
}
