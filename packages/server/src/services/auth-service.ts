import { ValidationError, object, string } from '@fintruth-sdk/validation'
import { hash } from 'bcrypt'
import { toDataURL } from 'qrcode'
import { is } from 'ramda'
import { generateSecret, totp } from 'speakeasy'
import { Inject, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { logger } from 'logger'
import {
  InitiateTwoFactorResponse,
  Response,
  ResponseError,
} from 'resolvers/types'
import { createToken, parseToken } from 'security'
import { User } from '../entities'
import UserService from './user-service'

interface RegistrationTokenData {
  email: string
  expiresAt: number
  password: string
}

@Service()
export default class AuthService {
  @Inject()
  userService: UserService

  @InjectRepository(User)
  private userRepository: Repository<User>

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findOne({ email })

    if (!user || !user.validatePassword(password)) {
      return null
    }

    return user
  }

  confirmRegistration(token: string) {
    const { email, expiresAt, password } = parseToken(token)
    const isExpired = expiresAt < Date.now()

    if (isExpired) {
      throw new Error('The provided token is expired')
    }

    return this.userService.createUser(email, password)
  }

  async confirmTwoFactor(token: string, userId: string) {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      const error = new ResponseError('User not found')

      return new Response({ error })
    }

    const isValid = totp.verify({
      encoding: 'base32',
      secret: user.secretTemp || '',
      token,
    })

    if (isValid) {
      await this.userRepository.update(userId, {
        secret: user.secretTemp,
        secretTemp: undefined,
      })
    }

    return new Response()
  }

  async initiateTwoFactor(userId: string) {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      const error = new ResponseError('User not found')

      return new InitiateTwoFactorResponse({ error })
    }

    const { base32, otpauth_url } = generateSecret({ otpauth_url: true }) // eslint-disable-line @typescript-eslint/camelcase
    const dataUrl: string = await toDataURL(otpauth_url)

    await this.userRepository.update(userId, { secretTemp: base32 })

    return new InitiateTwoFactorResponse({
      dataUrl,
      secret: base32,
    })
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
      const error = new ResponseError(
        'There is an issue with the provided form values'
      )

      return new Response({ error })
    }

    const isAvailable = await this.userService.emailAvailable(email)

    if (!isAvailable) {
      const error = new ResponseError('The user already exists')

      return new Response({ error })
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
