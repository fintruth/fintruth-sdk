import { equals, F, T } from 'ramda'
import { Container } from 'typedi'

import { User } from '../entities'
import {
  Response,
  ResponseError,
  EnableTwoFactorAuthResponse,
} from '../resolvers/types'
import AuthService from './auth-service'

jest.mock('dotenv-safe')

jest.mock('qrcode', () => ({
  toDataURL: () => 'dataUrl',
}))

jest.mock('speakeasy', () => ({
  generateSecret: jest.fn(() => ({ ascii: '', base32: 'base32' })),
  otpauthURL: () => '',
}))

jest.mock('type-graphql', () => ({
  Field: () => () => {},
  InputType: () => () => {},
  ObjectType: () => () => {},
}))

jest.mock('typeorm-typedi-extensions', () => ({
  InjectRepository: () => () => {},
}))

const getUserRepositoryMock: any = (userMock?: Partial<User>) => ({
  findOne: jest.fn(() => Promise.resolve(userMock)),
  update: jest.fn(() => Promise.resolve(true)),
})

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    service = Container.get(AuthService)
    service.userRepository = getUserRepositoryMock()
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
      let user: Partial<User>

      beforeAll(() => {
        const userWithPassword = {
          validatePassword: jest.fn(equals('good')),
        }

        user = userWithPassword
      })

      beforeEach(() => {
        service.userRepository = getUserRepositoryMock(user)
      })

      it('should return a user using a correct password', async () => {
        const result = await service.authenticate('test@test.com', 'good')

        expect(user.validatePassword).toHaveBeenCalledWith('good')
        expect(result).toStrictEqual(user)
      })

      it('should return null using an incorrect password', async () => {
        const result = await service.authenticate('test@test.com', 'bad')

        expect(user.validatePassword).toHaveBeenCalledWith('bad')
        expect(result).toBeNull()
      })
    })
  })

  describe('confirmTwoFactorAuth', () => {
    it('should return a failure response when a user has not initiated two factor', async () => {
      service.userRepository = getUserRepositoryMock({})

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
      let user: Partial<User>

      beforeAll(() => {
        const userWithSecretTemp = {
          secretTemp: 'secret',
        }

        user = userWithSecretTemp
      })

      beforeEach(() => {
        service.userRepository = getUserRepositoryMock(user)
      })

      it('should update user secret using a valid token', async () => {
        service.verifyTwoFactorAuthToken = T

        const result = await service.confirmTwoFactorAuth('token', 'userId')

        expect(service.userRepository.update).toHaveBeenCalledWith('userId', {
          secret: 'secret',
          secretTemp: undefined,
        })
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
      service.userRepository = getUserRepositoryMock({})

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
      let user: Partial<User>

      beforeAll(() => {
        const userWithSecret = {
          secret: 'secret',
        }

        user = userWithSecret
      })

      beforeEach(() => {
        service.userRepository = getUserRepositoryMock(user)
      })

      it('should remove user secret using a valid token', async () => {
        service.verifyTwoFactorAuthToken = T

        const result = await service.disableTwoFactorAuth('secret', 'userId')

        expect(service.userRepository.update).toHaveBeenCalledWith('userId', {
          secret: undefined,
        })
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
      service.userRepository = getUserRepositoryMock({})

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
