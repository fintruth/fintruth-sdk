import { Service } from 'typedi'

import {
  LoginInput,
  LoginResponse,
  RegistrationInput,
  RegistrationResponse,
} from 'resolvers/types'

@Service()
export class AuthService {
  async login(_: LoginInput): Promise<LoginResponse> {
    return { token: 'login_token' }
  }

  async register(_: RegistrationInput): Promise<RegistrationResponse> {
    return { token: 'register_token' }
  }
}
