import base64url from 'base64url'
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  pbkdf2Sync,
} from 'crypto'
import { Inject, Service } from 'typedi'

import { logAs } from 'logger'
import ConfigService from './config-service'

interface AesWithAuth {
  encrypted: Buffer
  tag: Buffer
}

@Service()
export default class CryptoService {
  @Inject()
  config: ConfigService

  private log = logAs('CryptoService')

  private logError = (error: any) => this.log(error.toString(), 'error')

  splitBuffer = (buffer: Buffer, idx: number): Buffer[] => [
    buffer.slice(0, idx),
    buffer.slice(idx, buffer.length),
  ]

  createToken(value: Record<string, any>): string {
    const text: string = JSON.stringify(value)
    const iv: Buffer = randomBytes(12)
    const salt: Buffer = randomBytes(16)
    const key: Buffer = pbkdf2Sync(
      this.config.app.secret,
      salt,
      10000,
      32,
      'sha512'
    )

    const { encrypted, tag } = this.encryptAes(text, key, iv)

    return base64url(Buffer.concat([iv, tag, salt, encrypted]))
  }

  parseToken<T extends Record<string, any>>(token: string): T | void {
    try {
      const decodeBytes: Buffer = base64url.toBuffer(token)

      const [prefix, rest]: Buffer[] = this.splitBuffer(decodeBytes, 28)
      const [iv, tag]: Buffer[] = this.splitBuffer(prefix, 12)
      const [salt, encrypted]: Buffer[] = this.splitBuffer(rest, 16)
      const key: Buffer = pbkdf2Sync(
        this.config.app.secret,
        salt,
        10000,
        32,
        'sha512'
      )

      if (iv.length !== 12 || tag.length !== 16 || salt.length !== 16) {
        throw new Error('invalid token')
      }

      const decrypted = this.decryptAes(encrypted, key, iv, tag)

      return JSON.parse(decrypted)
    } catch (error) {
      this.logError(error)

      return undefined
    }
  }

  private decryptAes(
    encrypted: Buffer,
    key: Buffer,
    iv: Buffer,
    tag: Buffer
  ): string {
    const decipher: any = createDecipheriv('aes-256-gcm', key, iv)

    decipher.setAuthTag(tag)

    return decipher.update(encrypted, 'binary', 'utf8') + decipher.final('utf8')
  }

  private encryptAes(text: string, key: Buffer, iv: Buffer): AesWithAuth {
    const cipher: any = createCipheriv('aes-256-gcm', key, iv)

    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ])

    return { encrypted, tag: cipher.getAuthTag() }
  }
}
