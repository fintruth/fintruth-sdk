import { equals } from 'ramda'
import { Container } from 'typedi'

import AuthService from './auth-service'

jest.mock('typeorm-typedi-extensions', () => ({
  InjectRepository: () => () => {},
}))

const userMock = {
  email: 'test@test.com',
  validatePassword: jest.fn(equals('good')),
}

const userRepositoryMock: any = {
  findOne: jest.fn(() => Promise.resolve(userMock)),
}

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    service = Container.get(AuthService)
    service.userRepository = userRepositoryMock
  })

  afterEach(() => {
    Container.reset(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('authenticate', () => {
    it('should return a user using a correct password', async () => {
      const result = await service.authenticate('test@test.com', 'good')

      expect(userMock.validatePassword).toHaveBeenCalledWith('good')
      expect(result).toStrictEqual(userMock)
    })

    it('should return null using an incorrect password', async () => {
      const result = await service.authenticate('test@test.com', 'bad')

      expect(userMock.validatePassword).toHaveBeenCalledWith('bad')
      expect(result).toBeNull()
    })
  })
})
