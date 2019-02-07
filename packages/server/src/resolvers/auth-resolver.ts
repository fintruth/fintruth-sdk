import jwt from 'jsonwebtoken'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { GraphQLBoolean } from 'graphql'
import { Inject } from 'typedi'

import UserService from 'services/user-service'
import { Context } from 'apollo'
import { RegisterInput, Response, UserResponse } from 'resolvers/types'
import { secret } from 'config'
import { User } from '../entities'

@Resolver()
export default class AuthResolver {
  @Inject()
  userService: UserService

  @Mutation(() => User)
  async confirmRegistration(@Arg('token') token: string) {
    return this.userService.confirmRegistration(token)
  }

  @Mutation(() => UserResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<UserResponse> {
    const user = await this.userService.authenticate(email, password)

    if (!user) {
      return {
        error: {
          id: 'b49e7dec-b1ad-495c-a853-d089816ed6bc',
          message: 'Incorrect email or password',
        },
      }
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
  signOut(@Ctx() { res }: Context) {
    res.clearCookie('token-id')

    return true
  }

  @Mutation(() => Response)
  async register(@Arg('input') { email, password }: RegisterInput) {
    return this.userService.register(email, password)
  }
}
