import { Inject } from 'typedi'
import { Arg, Mutation, Resolver } from 'type-graphql'

import {
  LoginInput,
  LoginResponse,
  RegistrationInput,
  RegistrationResponse,
} from './types'
import { AuthService } from 'services/auth-service'

@Resolver()
export class AuthResolver {
  @Inject()
  authService: AuthService

  @Mutation(() => LoginResponse)
  async login(@Arg('input') input: LoginInput): Promise<LoginResponse> {
    return this.authService.login(input)
  }

  @Mutation(() => RegistrationResponse)
  async register(
    @Arg('input') input: RegistrationInput
  ): Promise<RegistrationResponse> {
    return this.authService.register(input)
  }
}
