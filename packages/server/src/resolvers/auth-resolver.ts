import { GraphQLBoolean } from 'graphql'
import jwt from 'jsonwebtoken'
import { Inject } from 'typedi'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { Context } from 'apollo'
import { secret } from 'config'
import {
  ConfirmTwoFactorResponse,
  InitiateTwoFactorResponse,
  RegisterInput,
  RegisterResponse,
  ResponseError,
  SignInResponse,
} from 'resolvers/types'
import { AuthService } from 'services'
import { User } from '../entities'

@Resolver()
export default class AuthResolver {
  @Inject()
  authService: AuthService

  @Mutation(() => User)
  async confirmRegistration(@Arg('token') token: string) {
    return this.authService.confirmRegistration(token)
  }

  @Mutation(() => ConfirmTwoFactorResponse)
  async confirmTwoFactor(
    @Arg('token') token: string,
    @Ctx() { user }: Context
  ) {
    if (!user) {
      return {
        error: new ResponseError('Not authenticated'),
        verified: null,
      }
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

    const expiresIn = 60 * 60 * 24 * 180
    const token = jwt.sign({ id: user.id }, secret, { expiresIn })

    res.cookies.set('token-id', token, {
      httpOnly: true,
      maxAge: expiresIn * 1000,
      signed: false,
    })

    return new SignInResponse({ user })
  }

  @Mutation(() => GraphQLBoolean)
  signOut(@Ctx() { res }: Context) {
    res.clearCookie('token-id')

    return true
  }

  @Mutation(() => RegisterResponse)
  async register(@Arg('input') { email, password }: RegisterInput) {
    return this.authService.register(email, password)
  }
}
