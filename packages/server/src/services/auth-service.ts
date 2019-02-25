import jwt from 'jsonwebtoken'
import { toDataURL } from 'qrcode'
import { generateSecret, otpauthURL, totp } from 'speakeasy'
import { Inject, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { secret } from 'config'
import {
  EnableTwoFactorAuthResponse,
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

    return user && user.validatePassword(password) ? user : null
  }

  async confirmTwoFactorAuth(token: string, userId: string) {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      return new Response({ error: new ResponseError('User not found') })
    }

    const isValid =
      user.secretTemp && this.verifyTwoFactorAuthToken(token, user.secretTemp)

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

  async disableTwoFactorAuth(token: string, userId: string) {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      return new Response({ error: new ResponseError('User not found') })
    }

    const isValid =
      user.secret && this.verifyTwoFactorAuthToken(token, user.secret)

    if (!isValid) {
      return new Response({
        error: new ResponseError('Token is invalid or expired'),
      })
    }

    await this.userRepository.update(userId, { secret: undefined })

    return new Response()
  }

  async enableTwoFactorAuth(userId: string) {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      return new EnableTwoFactorAuthResponse({
        error: new ResponseError('User not found'),
      })
    }

    const { ascii, base32 } = generateSecret()
    const dataUrl: string = await toDataURL(
      otpauthURL({
        issuer: encodeURIComponent('Fintruth'),
        label: encodeURIComponent(user.email),
        secret: ascii,
      }),
      { margin: 0 }
    )

    await this.userRepository.update(userId, { secretTemp: base32 })

    return new EnableTwoFactorAuthResponse({ dataUrl, secret: base32 })
  }

  signAuthToken(res: ServerResponse, { id }: User) {
    const expiresIn = 60 * 60 * 24 * 180
    const token = jwt.sign({ id }, secret, { expiresIn })

    res.cookies.set('token-id', token, {
      httpOnly: true,
      maxAge: expiresIn * 1000,
      signed: false,
    })
  }

  verifyTwoFactorAuthToken(token: string, secret: string) {
    return totp.verify({ encoding: 'base32', secret, token })
  }
}
