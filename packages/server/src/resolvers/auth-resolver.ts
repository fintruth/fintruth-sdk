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
        error: {
          id: '5e5e2d7e-b21f-450e-b1f0-9997f4898f6a',
          message: 'Not authenticated',
        },
        verified: null,
      }
    }

    return this.authService.confirmTwoFactor(token, user.id)
  }

  @Mutation(() => InitiateTwoFactorResponse)
  async initiateTwoFactor(@Ctx() { user }: Context) {
    if (!user) {
      return {
        error: {
          id: 'a21c3867-9894-4f62-a3b1-6362468ea8b6',
          message: 'Not authenticated',
        },
        data: null,
      }
    }

    return this.authService.initiateTwoFactor(user.id)
  }

  @Mutation(() => SignInResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<SignInResponse> {
    const user = await this.authService.authenticate(email, password)

    if (!user) {
      return {
        error: {
          id: 'b49e7dec-b1ad-495c-a853-d089816ed6bc',
          message: 'Incorrect email or password',
        },
        user: null,
      }
    }

    const expiresIn = 60 * 60 * 24 * 180
    const token = jwt.sign({ id: user.id }, secret, { expiresIn })

    res.cookies.set('token-id', token, {
      httpOnly: true,
      maxAge: expiresIn * 1000,
      signed: false,
    })

    return { error: null, user }
  }

  @Mutation(() => GraphQLBoolean)
  signOut(@Ctx() { res }: Context) {
    res.clearCookie('token-id')

    return true
  }

  @Mutation(() => RegisterResponse)
  async register(@Arg('input') { email, password }: RegisterInput): Promise<
    RegisterResponse
  > {
    return this.authService.register(email, password)
  }
}
