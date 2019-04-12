import { ValidationError, object, string } from '@fintruth-sdk/validation'
import { hash } from 'bcrypt'
import { is } from 'ramda'
import { Inject, Service } from 'typedi'

import { logger } from 'logger'
import { Response, ResponseError, UserResponse } from 'resolvers/types'
import { createToken, parseToken } from 'security'
import AuthService from './auth-service'
import UserService from './user-service'

interface RegistrationTokenData {
  email: string
  expiresAt: number
  password: string
}

@Service()
export default class RegisterService {
  @Inject()
  authService: AuthService

  @Inject()
  userService: UserService

  confirmRegistration(token: string) {
    const { email, expiresAt, password } = parseToken(token)
    const isExpired = expiresAt < Date.now()

    if (isExpired) {
      return new UserResponse({
        error: new ResponseError('The provided token is expired'),
      })
    }

    return this.userService.create(email, password)
  }

  async register(email: string, password: string) {
    const schema = object().shape({
      email: string()
        .required()
        .email(),
      password: string()
        .required()
        .password(2),
    })

    const validated = await schema
      .validate({ email, password })
      .catch((error: ValidationError) => error)

    if (is(ValidationError, validated)) {
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
      password: await hash(password, 10),
    }
    const token = createToken(data)

    logger.info('Registration token: ', token)

    return new Response()
  }
}
