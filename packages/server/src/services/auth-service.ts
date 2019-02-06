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
  ConfirmTwoFactorResponse,
  InitiateTwoFactorResponse,
  RegisterResponse,
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

  async confirmTwoFactor(
    token: string,
    userId: string
  ): Promise<ConfirmTwoFactorResponse> {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      return {
        error: {
          id: 'f8df988e-edb9-4704-9156-d815b98d8eb4',
          message: 'User not found',
        },
        verified: null,
      }
    }

    const verified = totp.verify({
      encoding: 'base32',
      secret: user.secretTemp || '',
      token,
    })

    if (verified) {
      await this.userRepository.update(userId, {
        secret: user.secretTemp,
        secretTemp: undefined,
      })
    }

    return { error: null, verified }
  }

  async initiateTwoFactor(userId: string): Promise<InitiateTwoFactorResponse> {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      return {
        error: {
          id: 'cf22b845-256e-4a2c-ae68-512fd810535a',
          message: 'User not found',
        },
        dataUrl: null,
        secret: null,
      }
    }

    const { base32, otpauth_url } = generateSecret({ otpauth_url: true }) // eslint-disable-line @typescript-eslint/camelcase
    const dataUrl: string = await toDataURL(otpauth_url)

    await this.userRepository.update(userId, { secretTemp: base32 })

    return { error: null, dataUrl, secret: base32 }
  }

  async register(email: string, password: string): Promise<RegisterResponse> {
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
      return {
        error: {
          id: '8cf575e7-e073-481b-8be1-e7a3b7f8baf4',
          message: 'There is an issue with the provided form values',
        },
      }
    }

    const isAvailable = await this.userService.emailAvailable(email)

    if (!isAvailable) {
      return {
        error: {
          id: 'b4b61626-17d8-402b-b001-ad030d4b3589',
          message: 'The user already exists',
        },
      }
    }

    const expiresAt = Date.now() + 60 * 60 * 1000
    const data: RegistrationTokenData = {
      email,
      expiresAt,
      password: await hash(password, 10),
    }
    const token = createToken(data)

    logger.info('Registration token: ', token)

    return { error: null }
  }
}
