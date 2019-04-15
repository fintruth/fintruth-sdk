import { Inject } from 'typedi'
import { Arg, Mutation, Resolver } from 'type-graphql'

import { RegisterInput, Response, UserResponse } from 'resolvers/types'
import { RegisterService } from 'services'

@Resolver()
export default class RegisterResolver {
  @Inject()
  registerService: RegisterService

  @Mutation(() => UserResponse)
  async confirmRegistration(@Arg('token') token: string) {
    return this.registerService.confirmRegistration(token)
  }

  @Mutation(() => Response)
  async register(@Arg('input') input: RegisterInput) {
    return this.registerService.register(input)
  }
}
