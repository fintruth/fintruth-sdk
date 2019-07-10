import { object, string } from '@fintruth-sdk/validation'
import { Inject, Service } from 'typedi'

import { Loggable, logAs } from 'logger'
import {
  RegisterInput,
  Response,
  ResponseError,
  UserResponse,
} from 'resolvers/types'
import AuthService from './auth-service'
import CryptoService from './crypto-service'
import ProfileService from './profile-service'
import UserService from './user-service'

interface RegistrationTokenData extends RegisterInput {
  expiresAt: number
}

@Service()
export default class RegisterService {
  @Inject()
  authService: AuthService

  @Inject()
  cryptoService: CryptoService

  @Inject()
  profileService: ProfileService

  @Inject()
  userService: UserService

  private log = logAs('RegisterService')
  private logDebug = (message: Loggable) => this.log(message, 'debug')

  validateInput = async ({ profile, ...input }: RegisterInput) => {
    await this.profileService.validateInput(profile)

    return object<RegisterInput>()
      .shape({
        email: string()
          .required()
          .email(),
        password: string()
          .required()
          .password(2),
      })
      .validate({ profile, ...input })
  }

  confirmRegistration(token: string) {
    const {
      email,
      expiresAt,
      password,
      profile,
    } = this.cryptoService.parseToken(token) as RegistrationTokenData

    if (expiresAt < Date.now()) {
      return new UserResponse({
        error: new ResponseError('The provided token is expired'),
      })
    }

    return this.userService.create(
      email,
      password,
      this.profileService.toEntity(profile)
    )
  }

  async register({ email, profile, ...input }: RegisterInput) {
    const isValid = await this.validateInput({
      email,
      profile,
      ...input,
    }).catch(this.logDebug)

    if (!isValid) {
      return new Response({ error: new ResponseError('Invalid data provided') })
    }

    const isAvailable = await this.userService.isEmailAvailable(email)

    if (!isAvailable) {
      return new Response({
        error: new ResponseError('The user already exists'),
      })
    }

    const data: RegistrationTokenData = {
      email,
      expiresAt: Date.now() + 60 * 60 * 1000,
      profile,
      ...input,
    }
    const token = this.cryptoService.createToken(data)

    this.log(`Registration token: ${token}`)

    return new Response()
  }
}
