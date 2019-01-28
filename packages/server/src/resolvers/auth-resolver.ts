import { GraphQLBoolean } from 'graphql'
import jwt from 'jsonwebtoken'
import { Inject } from 'typedi'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { Context } from 'apollo'
import { secret } from 'config'
import { User } from 'entities/user'
import {
  LoginResponse,
  RegistrationInput,
  RegistrationResponse,
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

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await this.userService.authenticate(email, password)

    if (!user) {
      return { error: { message: 'invalid username or password' } }
    }

    const expiresIn = 60 * 60 * 24 * 180
    const token = jwt.sign({ id: user.id }, secret, { expiresIn })

    res.cookies.set('token-id', token, {
      httpOnly: true,
      maxAge: expiresIn * 1000,
      signed: false,
    })

    return { user }
  }

  @Mutation(() => GraphQLBoolean)
  logout(@Ctx() { res }: Context) {
    res.clearCookie('token-id')

    return true
  }

  @Mutation(() => RegistrationResponse)
  async register(@Arg('input') { email, password }: RegistrationInput): Promise<
    RegistrationResponse
  > {
    const token = await this.userService.register(email, password)

    return { token }
  }
}
