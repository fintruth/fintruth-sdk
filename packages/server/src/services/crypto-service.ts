import base64url from 'base64url'
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  pbkdf2Sync,
} from 'crypto'
import { Service } from 'typedi'

import { secret } from 'config'

interface AESWithAuth {
  encrypted: Buffer
  tag: Buffer
}

@Service()
export default class CryptoService {
  splitBuffer = (buffer: Buffer, idx: number): Buffer[] => [
    buffer.slice(0, idx),
    buffer.slice(idx, buffer.length),
  ]

  createToken(value: Record<string, any>): string {
    const text: string = JSON.stringify(value)
    const iv: Buffer = randomBytes(12)
    const salt: Buffer = randomBytes(16)
    const key: Buffer = pbkdf2Sync(secret, salt, 10000, 32, 'sha512')

    const { encrypted, tag } = this.encryptAES(text, key, iv)

    return base64url(Buffer.concat([iv, tag, salt, encrypted]))
  }

  parseToken(token: string): Record<string, any> {
    const decodeBytes: Buffer = base64url.toBuffer(token)

    const [prefix, rest]: Buffer[] = this.splitBuffer(decodeBytes, 28)
    const [iv, tag]: Buffer[] = this.splitBuffer(prefix, 12)
    const [salt, encrypted]: Buffer[] = this.splitBuffer(rest, 16)
    const key: Buffer = pbkdf2Sync(secret, salt, 10000, 32, 'sha512')

    if (iv.length !== 12 || tag.length !== 16 || salt.length !== 16) {
      throw new Error('invalid token')
    }

    const decrypted = this.decryptAES(encrypted, key, iv, tag)

    return JSON.parse(decrypted)
  }

  private decryptAES(
    encrypted: Buffer,
    key: Buffer,
    iv: Buffer,
    tag: Buffer
  ): string {
    const decipher: any = createDecipheriv('aes-256-gcm', key, iv)

    decipher.setAuthTag(tag)

    return decipher.update(encrypted, 'binary', 'utf8') + decipher.final('utf8')
  }

  private encryptAES(text: string, key: Buffer, iv: Buffer): AESWithAuth {
    const cipher: any = createCipheriv('aes-256-gcm', key, iv)

    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ])

    return {
      encrypted,
      tag: cipher.getAuthTag(),
    }
  }
}
