import { Container } from 'typedi'

import ConfigService from './config-service'
import CryptoService from './crypto-service'

describe('CryptoService', () => {
  let service: CryptoService

  beforeAll(() => {
    Container.set(ConfigService, {
      app: {
        secret: 'KEYKEYKEYKEYKEYKEYKEYKEYKEYKEYKEY',
      },
    })
  })

  beforeEach(() => {
    service = Container.get(CryptoService)
  })

  afterEach(() => {
    Container.reset(CryptoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('splitBuffer', () => {
    it('should split a buffer at a given index parameter', () => {
      const buffer = Buffer.from('abcdefgh')
      const [a, b] = service.splitBuffer(buffer, 4)

      expect(a).toStrictEqual(Buffer.from('abcd'))
      expect(b).toStrictEqual(Buffer.from('efgh'))
    })
  })

  describe('createToken', () => {
    it('should encrypt a object to a string', () => {
      const value = { message: 'a random string' }
      const encrypted = service.createToken(value)

      expect(typeof encrypted).toBe('string')
    })
  })

  describe('parseToken', () => {
    it('should decrypt a base64url encoded string', () => {
      const token =
        'I5kXX__4LwtZ-sQRwbdUWo_lsC1bDXt6XhnKUDfcIhD0qI81mUx8gdfdAXDsuOqY0DIrIq371kLsU04jZA_8xXe-GYWXKffOgQ'
      const parsed = service.parseToken(token)

      expect(parsed).toStrictEqual({ message: 'a random string' })
    })
    it('should throw an error with an invalid token', () => {
      expect(() => service.parseToken('bad')).toThrow(/^invalid token$/)
    })
  })
})
