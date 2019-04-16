import { object, string } from '@fintruth-sdk/validation'
import { Inject, Service } from 'typedi'

import { logAs, Loggable } from 'logger'
import {
  RegisterInput,
  Response,
  ResponseError,
  UserResponse,
} from 'resolvers/types'
import { createToken, parseToken } from 'security'
import AuthService from './auth-service'
import UserService from './user-service'
import { Profile } from '../entities'

interface RegistrationTokenData {
  email: string
  expiresAt: number
  firstName: string
  lastName: string
  password: string
}

@Service()
export default class RegisterService {
  @Inject()
  authService: AuthService

  @Inject()
  userService: UserService

  private log = logAs('RegisterService')
  private logDebug = (message: Loggable) => this.log(message, 'debug')

  confirmRegistration(token: string) {
    const { email, expiresAt, firstName, lastName, password } = parseToken(
      token
    )
    const isExpired = expiresAt < Date.now()

    if (isExpired) {
      return new UserResponse({
        error: new ResponseError('The provided token is expired'),
      })
    }

    return this.userService.create(
      email,
      password,
      new Profile({
        firstName,
        lastName,
      })
    )
  }

  async register({ email, firstName, lastName, password }: RegisterInput) {
    const valid = await object()
      .shape({
        email: string()
          .required()
          .email(),
        password: string()
          .required()
          .password(2),
      })
      .validate({ email, password })
      .catch(this.logDebug)

    if (!valid) {
      return new Response({ error: new ResponseError('Invalid data provided') })
    }

    const isAvailable = await this.userService.emailAvailable(email)

    if (!isAvailable) {
      return new Response({
        error: new ResponseError('The user already exists'),
      })
    }

    const expiresAt = Date.now() + 60 * 60 * 1000
    const data: RegistrationTokenData = {
      email,
      expiresAt,
      firstName,
      lastName,
      password,
    }
    const token = createToken(data)

    this.log(`Registration token: ${token}`)

    return new Response()
  }
}
