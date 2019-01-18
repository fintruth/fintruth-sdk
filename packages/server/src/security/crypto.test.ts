import { createToken, parseToken, splitBuffer } from './crypto'

jest.mock('config', () => ({ secret: 'KEYKEYKEYKEYKEYKEYKEYKEYKEYKEYKEY' }))

describe('Security crypto', () => {
  describe('splitBuffer', () => {
    it('should split a buffer at a given index parameter', () => {
      const buffer = Buffer.from('abcdefgh')
      const [a, b] = splitBuffer(buffer, 4)

      expect(a).toStrictEqual(Buffer.from('abcd'))
      expect(b).toStrictEqual(Buffer.from('efgh'))
    })
  })
  describe('createToken', () => {
    it('should encrypt a object to a string', () => {
      const value = { message: 'a random string' }
      const encrypted = createToken(value)

      expect(typeof encrypted).toBe('string')
    })
  })
  describe('parseToken', () => {
    it('should decrypt a base64url encoded string', () => {
      const token =
        'I5kXX__4LwtZ-sQRwbdUWo_lsC1bDXt6XhnKUDfcIhD0qI81mUx8gdfdAXDsuOqY0DIrIq371kLsU04jZA_8xXe-GYWXKffOgQ'
      const parsed = parseToken(token)

      expect(parsed).toStrictEqual({ message: 'a random string' })
    })
    it('should throw an error with an invalid token', () => {
      expect(() => parseToken('bad')).toThrow(/^invalid token$/)
    })
  })
})
