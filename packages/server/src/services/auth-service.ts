import jwt from 'jsonwebtoken'
import { toDataURL } from 'qrcode'
import { generateSecret, otpauthURL, totp } from 'speakeasy'
import { Inject, Service } from 'typedi'

import { Ability } from 'auth' // eslint-disable-line import/named
import { Daos } from 'models'
import {
  EnableTwoFactorAuthResponse,
  Response,
  ResponseError,
  SignInResponse,
} from 'resolvers/types'
import { ServerResponse } from 'server'
import ConfigService from './config-service'
import { User } from '../entities'

export interface UserTokenData {
  iat?: number
  id: string
  isAdmin: boolean
  exp?: number
}

@Service()
export default class AuthService {
  @Inject()
  config: ConfigService

  @Inject()
  daos: Daos

  private verifyTwoFactorAuthToken = (token: string, secret: string) =>
    totp.verify({ encoding: 'base32', secret, token })

  async authenticate(email: string, password: string, res: ServerResponse) {
    const user = await this.daos.users.findByEmail(email)

    if (!user || !user.validatePassword(password)) {
      return new SignInResponse({
        error: new ResponseError('Incorrect email or password'),
      })
    }

    const { isTwoFactorAuthEnabled } = user

    if (!isTwoFactorAuthEnabled) {
      this.signAuthToken(res, user)
    }

    return new SignInResponse({ isTwoFactorAuthEnabled })
  }

  async authenticateTwoFactor(
    email: string,
    password: string,
    token: string,
    res: ServerResponse
  ) {
    const user = await this.daos.users.findByEmail(email)

    if (!user || !user.validatePassword(password)) {
      return new Response({
        error: new ResponseError('Incorrect email or password'),
      })
    }

    if (!user.isTwoFactorAuthEnabled) {
      this.signAuthToken(res, user)
    }

    const isValid =
      user.secret && this.verifyTwoFactorAuthToken(token, user.secret)

    if (!isValid) {
      return new Response({
        error: new ResponseError('Token is invalid or expired'),
      })
    }

    this.signAuthToken(res, user)

    return new Response()
  }

  async confirmTwoFactorAuth(token: string, userId: string, ability: Ability) {
    const user = await this.daos.users.findById(userId)

    if (!user) {
      return new Response({ error: new ResponseError('User not found') })
    }

    if (!user.secretTemp) {
      return new Response({
        error: new ResponseError('Two factor not initiated'),
      })
    }

    ability.throwUnlessCan('update', user)

    const isValid = this.verifyTwoFactorAuthToken(token, user.secretTemp)

    if (!isValid) {
      return new Response({
        error: new ResponseError('Token is invalid or expired'),
      })
    }

    await this.daos.users.update(userId, {
      secret: user.secretTemp,
      secretTemp: undefined,
    })

    return new Response()
  }

  async disableTwoFactorAuth(token: string, userId: string, ability: Ability) {
    const user = await this.daos.users.findById(userId)

    if (!user) {
      return new Response({ error: new ResponseError('User not found') })
    }

    if (!user.secret) {
      return new Response({
        error: new ResponseError('Two factor not enabled'),
      })
    }

    ability.throwUnlessCan('update', user)

    const isValid = this.verifyTwoFactorAuthToken(token, user.secret)

    if (!isValid) {
      return new Response({
        error: new ResponseError('Token is invalid or expired'),
      })
    }

    await this.daos.users.update(userId, { secret: undefined })

    return new Response()
  }

  async enableTwoFactorAuth(userId: string, ability: Ability) {
    const user = await this.daos.users.findOne(userId, {
      relations: ['emails'],
    })

    if (!user) {
      return new EnableTwoFactorAuthResponse({
        error: new ResponseError('User not found'),
      })
    }

    ability.throwUnlessCan('update', user)

    const { ascii, base32 } = generateSecret()
    const dataUrl: string = await toDataURL(
      otpauthURL({
        issuer: encodeURIComponent('Fintruth'),
        label: encodeURIComponent(user.emails[0].value),
        secret: ascii,
      }),
      { margin: 0 }
    )

    await this.daos.users.update(userId, { secretTemp: base32 })

    return new EnableTwoFactorAuthResponse({ dataUrl, secret: base32 })
  }

  signAuthToken(res: ServerResponse, { id, isAdmin }: User) {
    const expiresIn = 60 * 60 * 24 * 180
    const tokenData: UserTokenData = { id, isAdmin }
    const token = jwt.sign(tokenData, this.config.app.secret, {
      expiresIn,
    })

    res.cookies.set('token-id', token, {
      httpOnly: true,
      maxAge: expiresIn * 1000,
      signed: false,
    })
  }
}
