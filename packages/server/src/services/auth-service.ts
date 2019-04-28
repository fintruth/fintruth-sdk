import jwt from 'jsonwebtoken'
import { toDataURL } from 'qrcode'
import { generateSecret, otpauthURL, totp } from 'speakeasy'
import { Inject, Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { UserDao } from 'models'
import {
  EnableTwoFactorAuthResponse,
  Response,
  ResponseError,
} from 'resolvers/types'
import { ServerResponse } from 'server'
import { ConfigService } from 'services'
import { User } from '../entities'

@Service()
export default class AuthService {
  @Inject()
  config: ConfigService

  @InjectRepository(User)
  userDao: UserDao

  async authenticate(email: string, password: string) {
    const user = await this.userDao.findOne({ email })

    return user && user.validatePassword(password) ? user : null
  }

  async confirmTwoFactorAuth(token: string, userId: string) {
    const user = await this.userDao.findOne(userId)

    if (!user) {
      return new Response({ error: new ResponseError('User not found') })
    }

    if (!user.secretTemp) {
      return new Response({
        error: new ResponseError('Two factor not initiated'),
      })
    }

    const isValid = this.verifyTwoFactorAuthToken(token, user.secretTemp)

    if (!isValid) {
      return new Response({
        error: new ResponseError('Token is invalid or expired'),
      })
    }

    await this.userDao.update(userId, {
      secret: user.secretTemp,
      secretTemp: undefined,
    })

    return new Response()
  }

  async disableTwoFactorAuth(token: string, userId: string) {
    const user = await this.userDao.findOne(userId)

    if (!user) {
      return new Response({ error: new ResponseError('User not found') })
    }

    if (!user.secret) {
      return new Response({
        error: new ResponseError('Two factor not enabled'),
      })
    }

    const isValid = this.verifyTwoFactorAuthToken(token, user.secret)

    if (!isValid) {
      return new Response({
        error: new ResponseError('Token is invalid or expired'),
      })
    }

    await this.userDao.update(userId, { secret: undefined })

    return new Response()
  }

  async enableTwoFactorAuth(userId: string) {
    const user = await this.userDao.findOne(userId)

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

    await this.userDao.update(userId, { secretTemp: base32 })

    return new EnableTwoFactorAuthResponse({ dataUrl, secret: base32 })
  }

  signAuthToken(res: ServerResponse, { id, isAdmin }: User) {
    const expiresIn = 60 * 60 * 24 * 180
    const token = jwt.sign({ id, isAdmin }, this.config.app.secret, {
      expiresIn,
    })

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
