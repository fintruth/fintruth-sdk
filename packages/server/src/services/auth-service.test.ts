import { equals, F, T } from 'ramda'
import { Container } from 'typedi'

import {
  EnableTwoFactorAuthResponse,
  Response,
  ResponseError,
} from 'resolvers/types'
import AuthService from './auth-service'
import { Email, User } from '../entities'

jest.mock('jsonwebtoken', () => ({
  sign: () => 'token',
}))

jest.mock('qrcode', () => ({
  toDataURL: () => 'dataUrl',
}))

jest.mock('speakeasy', () => ({
  generateSecret: () => ({ ascii: '', base32: 'base32' }),
  otpauthURL: () => '',
  totp: () => {},
}))

jest.mock('./config-service')

const abilityMock: any = {
  throwUnlessCan: () => {},
}

const resMock: any = {
  cookies: {
    set: () => {},
  },
}

const getUserDaoMock: any = (userMock?: User) => ({
  findByEmail: async () => userMock,
  findById: async () => userMock,
  findOne: async () => userMock,
  update: () => {},
})

const userMock = new User({
  id: 'userId',
  emails: [
    new Email({
      value: 'test@test.com',
    }),
  ],
  validatePassword: jest.fn(equals('good')),
})

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    service = Container.get(AuthService)
    service.daos.users = getUserDaoMock()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('authenticate', () => {
    it('should return a failure response when a user does not exist', async () => {
      const result = await service.authenticate(
        'test@test.com',
        'good',
        resMock
      )

      expect(result.error).toStrictEqual(
        new ResponseError('Incorrect email or password', expect.any(String))
      )
    })

    describe('user exists with password', () => {
      beforeEach(() => {
        service.daos.users = getUserDaoMock(userMock)
      })

      it('should return a user response', async () => {
        const result = await service.authenticate(
          'test@test.com',
          'good',
          resMock
        )

        expect(result.error).toBeUndefined()
      })

      it('should return a failure response using an incorrect password', async () => {
        const result = await service.authenticate(
          'test@test.com',
          'bad',
          resMock
        )

        expect(result.error).toStrictEqual(
          new ResponseError('Incorrect email or password', expect.any(String))
        )
      })
    })
  })

  describe('authenticateTwoFactor', () => {
    it('should return a failure response when a user does not exist', async () => {
      const result = await service.authenticateTwoFactor(
        'test@test.com',
        'good',
        'token',
        resMock
      )

      expect(result.error).toStrictEqual(
        new ResponseError('Incorrect email or password', expect.any(String))
      )
    })

    describe('user exists with password and 2FA', () => {
      beforeEach(() => {
        service.daos.users = getUserDaoMock(
          new User({
            ...userMock,
            secret: 'secret',
          })
        )
      })

      it('should return a user response', async () => {
        service['verifyTwoFactorAuthToken'] = T

        const result = await service.authenticateTwoFactor(
          'test@test.com',
          'good',
          'token',
          resMock
        )

        expect(result.error).toBeUndefined()
      })

      it('should return a failure response using an invalid token', async () => {
        service['verifyTwoFactorAuthToken'] = F

        const result = await service.authenticateTwoFactor(
          'test@test.com',
          'good',
          'token',
          resMock
        )

        expect(result.error).toStrictEqual(
          new ResponseError('Token is invalid or expired', expect.any(String))
        )
      })

      it('should return a failure response using an incorrect password', async () => {
        const result = await service.authenticateTwoFactor(
          'test@test.com',
          'bad',
          'token',
          resMock
        )

        expect(result.error).toStrictEqual(
          new ResponseError('Incorrect email or password', expect.any(String))
        )
      })
    })
  })

  describe('confirmTwoFactorAuth', () => {
    it('should return a failure response when a user has not initiated two factor', async () => {
      service.daos.users = getUserDaoMock({})

      const result = await service.confirmTwoFactorAuth(
        'token',
        'userId',
        abilityMock
      )

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
      const user: Partial<User> = { secretTemp: 'secret' }

      beforeEach(() => {
        service.daos.users = getUserDaoMock(user)
      })

      it('should update user secret using a valid token', async () => {
        service['verifyTwoFactorAuthToken'] = T

        const result = await service.confirmTwoFactorAuth(
          'token',
          'userId',
          abilityMock
        )

        expect(result.error).toBeUndefined()
      })

      it('should return a failure response using an invalid token', async () => {
        service['verifyTwoFactorAuthToken'] = F

        const result = await service.confirmTwoFactorAuth(
          'token',
          'userId',
          abilityMock
        )

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
      service.daos.users = getUserDaoMock({})

      const result = await service.disableTwoFactorAuth(
        'token',
        'userId',
        abilityMock
      )

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
      const user: Partial<User> = { secret: 'secret' }

      beforeEach(() => {
        service.daos.users = getUserDaoMock(user)
      })

      it('should remove user secret using a valid token', async () => {
        service['verifyTwoFactorAuthToken'] = T

        const result = await service.disableTwoFactorAuth(
          'secret',
          'userId',
          abilityMock
        )

        expect(result.error).toBeUndefined()
      })

      it('should return a failure response using an invalid token', async () => {
        service['verifyTwoFactorAuthToken'] = F

        const result = await service.disableTwoFactorAuth(
          'secret',
          'userId',
          abilityMock
        )

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
      const result = await service.enableTwoFactorAuth('userId', abilityMock)

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

      const result = await service.enableTwoFactorAuth('userId', abilityMock)

      expect(result).toStrictEqual(
        new EnableTwoFactorAuthResponse({
          dataUrl: 'dataUrl',
          secret: 'base32',
        })
      )
    })
  })
})
