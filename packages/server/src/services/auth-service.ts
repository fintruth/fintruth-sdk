import jwt from 'jsonwebtoken'
import { toDataURL } from 'qrcode'
import { generateSecret, totp } from 'speakeasy'
import { Inject, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { secret } from 'config'
import {
  InitiateTwoFactorResponse,
  Response,
  ResponseError,
} from 'resolvers/types'
import { ServerResponse } from 'server'
import { User } from '../entities'
import UserService from './user-service'

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

  async confirmTwoFactor(token: string, userId: string) {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      return new Response({ error: new ResponseError('User not found') })
    }

    const isValid =
      user.secretTemp && this.verifyTwoFactorToken(token, user.secretTemp)

    if (!isValid) {
      return new Response({
        error: new ResponseError('Token is invalid or expired'),
      })
    }

    await this.userRepository.update(userId, {
      secret: user.secretTemp,
      secretTemp: undefined,
    })

    return new Response()
  }

  async disableTwoFactor(token: string, userId: string) {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      return new Response({ error: new ResponseError('User not found') })
    }

    const isValid = user.secret && this.verifyTwoFactorToken(token, user.secret)

    if (!isValid) {
      return new Response({
        error: new ResponseError('Token is invalid or expired'),
      })
    }

    await this.userRepository.update(userId, {
      secret: undefined,
    })

    return new Response()
  }

  async initiateTwoFactor(userId: string) {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      return new InitiateTwoFactorResponse({
        error: new ResponseError('User not found'),
      })
    }

    const { base32, otpauth_url } = generateSecret({ otpauth_url: true }) // eslint-disable-line @typescript-eslint/camelcase
    const dataUrl: string = await toDataURL(otpauth_url)

    await this.userRepository.update(userId, { secretTemp: base32 })

    return new InitiateTwoFactorResponse({
      dataUrl,
      secret: base32,
    })
  }

  withNewAuthentication(res: ServerResponse, { id }: User) {
    const expiresIn = 60 * 60 * 24 * 180
    const token = jwt.sign({ id }, secret, { expiresIn })

    res.cookies.set('token-id', token, {
      httpOnly: true,
      maxAge: expiresIn * 1000,
      signed: false,
    })
  }

  verifyTwoFactorToken(token: string, secret: string) {
    return totp.verify({
      encoding: 'base32',
      secret,
      token,
    })
  }
}
