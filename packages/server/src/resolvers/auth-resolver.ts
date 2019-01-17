import { ApolloError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { Inject } from 'typedi'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { LoginInput, RegistrationInput, RegistrationResponse } from './types'
import { Context } from 'apollo'
import { secret } from 'config'
import { User } from 'entities/user'
import { UserService } from 'services/user-service'

@Resolver()
export class AuthResolver {
  @Inject()
  userService: UserService

  @Mutation(() => User)
  async login(
    @Arg('input') { email, password }: LoginInput,
    @Ctx() { res }: Context
  ): Promise<User> {
    const user = await this.userService.authenticate(email, password)

    if (!user) {
      throw new ApolloError('The user does not exist')
    }

    const expiresIn = 60 * 60 * 24 * 180
    const token = jwt.sign({ id: user.id }, secret, { expiresIn })

    res.cookies.set('token-id', token, {
      httpOnly: true,
      maxAge: expiresIn * 1000,
      signed: false,
    })

    return user
  }

  @Mutation(() => RegistrationResponse)
  async register(@Arg('input') { email, password }: RegistrationInput): Promise<
    RegistrationResponse
  > {
    const token = await this.userService.register(email, password)

    if (!token) {
      throw new ApolloError('The email is already taken')
    }

    return { token }
  }
}
