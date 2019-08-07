import { equals, F, T } from 'ramda'
import { Container } from 'typedi'

import {
  EnableTwoFactorAuthResponse,
  ResponseError,
  UserResponse,
} from 'resolvers/types'
import AuthService from './auth-service'
import { Email, User } from '../entities'

jest.mock('qrcode', () => ({
  toDataURL: () => 'dataUrl',
}))

jest.mock('speakeasy', () => ({
  generateSecret: () => ({ ascii: '', base32: 'base32' }),
  otpauthURL: () => '',
}))

jest.mock('./config-service')

const getUserDaoMock: any = (userMock?: Partial<User>) => ({
  findByEmail: jest.fn(() => Promise.resolve(userMock)),
  findOne: jest.fn(() => Promise.resolve(userMock)),
  update: jest.fn(() => Promise.resolve(true)),
})

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    service = Container.get(AuthService)
    service.daos.users = getUserDaoMock()
  })

  afterEach(() => {
    Container.reset(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('authenticate', () => {
    it('should return null when a user does not exist', async () => {
      const result = await service.authenticate('test@test.com', 'good')

      expect(result).toBeNull()
    })

    describe('user exists with password', () => {
      const user: Partial<User> = {
        validatePassword: jest.fn(equals('good')),
      }

      beforeEach(() => {
        service.daos.users = getUserDaoMock(user)
      })

      it('should return a user using a correct password', async () => {
        const result = await service.authenticate('test@test.com', 'good')

        expect(result).toStrictEqual(user)
      })

      it('should return null using an incorrect password', async () => {
        const result = await service.authenticate('test@test.com', 'bad')

        expect(result).toBeNull()
      })
    })
  })

  describe('confirmTwoFactorAuth', () => {
    it('should return a failure response when a user has not initiated two factor', async () => {
      service.daos.users = getUserDaoMock({})

      const result = await service.confirmTwoFactorAuth('token', 'userId')

      expect(result).toStrictEqual(
        new UserResponse({
          error: new ResponseError(
            'Two factor not initiated',
            expect.any(String)
          ),
        })
      )
    })

    describe('user exists with two factor pending', () => {
      const user: Partial<User> = { secretTemp: 'secret' }

      beforeEach(() => {
        service.daos.users = getUserDaoMock(user)
      })

      it('should update user secret using a valid token', async () => {
        service.verifyTwoFactorAuthToken = T

        const result = await service.confirmTwoFactorAuth('token', 'userId')

        expect(result.user).toStrictEqual({ secretTemp: 'secret' })
      })

      it('should return a failure response using an invalid token', async () => {
        service.verifyTwoFactorAuthToken = F

        const result = await service.confirmTwoFactorAuth('token', 'userId')

        expect(result).toStrictEqual(
          new UserResponse({
            error: new ResponseError(
              'Token is invalid or expired',
              expect.any(String)
            ),
          })
        )
      })
    })
  })

  describe('disableTwoFactorAuth', () => {
    it('should return a failure response when a user has not enabled two factor', async () => {
      service.daos.users = getUserDaoMock({})

      const result = await service.disableTwoFactorAuth('token', 'userId')

      expect(result).toStrictEqual(
        new UserResponse({
          error: new ResponseError(
            'Two factor not enabled',
            expect.any(String)
          ),
        })
      )
    })

    describe('user exists with two factor enabled', () => {
      const user: Partial<User> = { secret: 'secret' }

      beforeEach(() => {
        service.daos.users = getUserDaoMock(user)
      })

      it('should remove user secret using a valid token', async () => {
        service.verifyTwoFactorAuthToken = T

        const result = await service.disableTwoFactorAuth('secret', 'userId')

        expect(result.user).toStrictEqual({ secret: 'secret' })
      })

      it('should return a failure response using an invalid token', async () => {
        service.verifyTwoFactorAuthToken = F

        const result = await service.disableTwoFactorAuth('secret', 'userId')

        expect(result).toStrictEqual(
          new UserResponse({
            error: new ResponseError(
              'Token is invalid or expired',
              expect.any(String)
            ),
          })
        )
      })
    })
  })

  describe('enableTwoFactorAuth', () => {
    it('should return a failure response when a user does not exist', async () => {
      const result = await service.enableTwoFactorAuth('userId')

      expect(result).toStrictEqual(
        new EnableTwoFactorAuthResponse({
          dataUrl: undefined,
          error: new ResponseError('User not found', expect.any(String)),
          secret: undefined,
        })
      )
    })

    it('should initiate two factor', async () => {
      service.daos.users = getUserDaoMock({
        emails: [new Email({ value: 'test@test.com' })],
      })

      const result = await service.enableTwoFactorAuth('userId')

      expect(result).toStrictEqual(
        new EnableTwoFactorAuthResponse({
          dataUrl: 'dataUrl',
          secret: 'base32',
        })
      )
    })
  })
})
