import { equals, F, T } from 'ramda'
import { Container } from 'typedi'

import { User } from '../entities'
import { Response, ResponseError } from '../resolvers/types'
import AuthService from './auth-service'

jest.mock('typeorm-typedi-extensions', () => ({
  InjectRepository: () => () => {},
}))

jest.mock('type-graphql', () => ({
  Field: () => () => {},
  InputType: () => () => {},
  ObjectType: () => () => {},
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

      const error = new ResponseError('Token is invalid or expired')
      error.id = expect.any(String)

      expect(result).toStrictEqual(
        new Response({
          error,
        })
      )
    })
  })
})
