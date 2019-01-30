import { GraphQLBoolean } from 'graphql'
import jwt from 'jsonwebtoken'
import { Inject } from 'typedi'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { User } from '../entities'
import { Context } from 'apollo'
import { secret } from 'config'
import {
  RegisterInput,
  RegisterResponse,
  SignInResponse,
} from 'resolvers/types'
import { UserService } from 'services/user-service'

@Resolver()
export class AuthResolver {
  @Inject()
  userService: UserService

  @Mutation(() => User)
  async confirmRegistration(@Arg('token') token: string) {
    return this.userService.confirmRegistration(token)
  }

  @Mutation(() => SignInResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<SignInResponse> {
    const user = await this.userService.authenticate(email, password)

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
    return this.userService.register(email, password)
  }
}
