import { equals, F, T } from 'ramda'
import { Container } from 'typedi'

import { User } from '../entities'
import {
  Response,
  ResponseError,
  EnableTwoFactorAuthResponse,
} from '../resolvers/types'
import AuthService from './auth-service'

jest.mock('qrcode', () => ({
  toDataURL: () => 'dataUrl',
}))

jest.mock('speakeasy', () => ({
  generateSecret: jest.fn(() => ({ ascii: '', base32: 'secretTemp' })),
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
    it('should return a user using a correct password', async () => {
      const user = {
        validatePassword: jest.fn(equals('good')),
      }

      service.userRepository = getUserRepositoryMock(user)

      const result = await service.authenticate('test@test.com', 'good')

      expect(user.validatePassword).toHaveBeenCalledWith('good')
      expect(result).toStrictEqual(user)
    })

    it('should return null using an incorrect password', async () => {
      const user = {
        validatePassword: jest.fn(equals('good')),
      }

      service.userRepository = getUserRepositoryMock(user)

      const result = await service.authenticate('test@test.com', 'bad')

      expect(user.validatePassword).toHaveBeenCalledWith('bad')
      expect(result).toBeNull()
    })
  })

  describe('confirmTwoFactorAuth', () => {
    it('should update user secret using a valid token', async () => {
      const user = {
        secretTemp: 'secret',
      }

      service.userRepository = getUserRepositoryMock(user)
      service.verifyTwoFactorAuthToken = T

      const result = await service.confirmTwoFactorAuth('token', 'test')

      expect(service.userRepository.update).toHaveBeenCalledWith('test', {
        secret: 'secret',
        secretTemp: undefined,
      })
      expect(result).toStrictEqual(new Response())
    })

    it('should return a failure response using an invalid token', async () => {
      const user = {
        secretTemp: 'secret',
      }

      service.userRepository = getUserRepositoryMock(user)
      service.verifyTwoFactorAuthToken = F

      const result = await service.confirmTwoFactorAuth('token', 'test')

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

  describe('disableTwoFactorAuth', () => {
    it('should remove user secret using a valid token', async () => {
      const user = {
        secret: 'secret',
      }

      service.userRepository = getUserRepositoryMock(user)
      service.verifyTwoFactorAuthToken = T

      const result = await service.disableTwoFactorAuth('secret', 'test')

      expect(service.userRepository.update).toHaveBeenCalledWith('test', {
        secret: undefined,
      })
      expect(result).toStrictEqual(new Response())
    })

    it('should return a failure response using an invalid token', async () => {
      const user = {
        secret: 'secret',
      }

      service.userRepository = getUserRepositoryMock(user)
      service.verifyTwoFactorAuthToken = F

      const result = await service.disableTwoFactorAuth('secret', 'test')

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

  describe('enableTwoFactorAuth', () => {
    it('should update user secret temp', async () => {
      const user = {}

      service.userRepository = getUserRepositoryMock(user)

      const result = await service.enableTwoFactorAuth('test')

      expect(result).toStrictEqual(
        new EnableTwoFactorAuthResponse({
          dataUrl: 'dataUrl',
          secret: 'secretTemp',
        })
      )
    })

    it('should return a failure response when a user is not found', async () => {
      const result = await service.enableTwoFactorAuth('test')

      expect(result).toStrictEqual(
        new EnableTwoFactorAuthResponse({
          dataUrl: undefined,
          error: new ResponseError('User not found', expect.any(String)),
          secret: undefined,
        })
      )
    })
  })
})
