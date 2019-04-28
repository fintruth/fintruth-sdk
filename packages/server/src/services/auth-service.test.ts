import { equals, F, T } from 'ramda'
import { Container } from 'typedi'

import {
  Response,
  ResponseError,
  EnableTwoFactorAuthResponse,
} from 'resolvers/types'
import AuthService from './auth-service'
import { User } from '../entities'

jest.mock('qrcode', () => ({
  toDataURL: () => 'dataUrl',
}))

jest.mock('speakeasy', () => ({
  generateSecret: () => ({ ascii: '', base32: 'base32' }),
  otpauthURL: () => '',
}))

const getUserDaoMock: any = (userMock?: Partial<User>) => ({
  findOne: jest.fn(() => Promise.resolve(userMock)),
  update: jest.fn(() => Promise.resolve(true)),
})

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    service = Container.get(AuthService)
    service.userDao = getUserDaoMock()
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
      let user: Partial<User> = {
        validatePassword: jest.fn(equals('good')),
      }

      beforeEach(() => {
        service.userDao = getUserDaoMock(user)
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
      service.userDao = getUserDaoMock({})

      const result = await service.confirmTwoFactorAuth('token', 'userId')

      expect(result).toStrictEqual(
        new Response({
          error: new ResponseError(
            'Two factor not initiated',
            expect.any(String)
          ),
        })
      )
    })

    describe('user exists with two factor pending', () => {
      let user: Partial<User> = {
        secretTemp: 'secret',
      }

      beforeEach(() => {
        service.userDao = getUserDaoMock(user)
      })

      it('should update user secret using a valid token', async () => {
        service.verifyTwoFactorAuthToken = T

        const result = await service.confirmTwoFactorAuth('token', 'userId')

        expect(result).toStrictEqual(new Response())
      })

      it('should return a failure response using an invalid token', async () => {
        service.verifyTwoFactorAuthToken = F

        const result = await service.confirmTwoFactorAuth('token', 'userId')

        expect(result).toStrictEqual(
          new Response({
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
      service.userDao = getUserDaoMock({})

      const result = await service.disableTwoFactorAuth('token', 'userId')

      expect(result).toStrictEqual(
        new Response({
          error: new ResponseError(
            'Two factor not enabled',
            expect.any(String)
          ),
        })
      )
    })

    describe('user exists with two factor enabled', () => {
      let user: Partial<User> = {
        secret: 'secret',
      }

      beforeEach(() => {
        service.userDao = getUserDaoMock(user)
      })

      it('should remove user secret using a valid token', async () => {
        service.verifyTwoFactorAuthToken = T

        const result = await service.disableTwoFactorAuth('secret', 'userId')

        expect(result).toStrictEqual(new Response())
      })

      it('should return a failure response using an invalid token', async () => {
        service.verifyTwoFactorAuthToken = F

        const result = await service.disableTwoFactorAuth('secret', 'userId')

        expect(result).toStrictEqual(
          new Response({
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
      service.userDao = getUserDaoMock({})

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
