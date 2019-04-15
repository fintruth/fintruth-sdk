import { equals } from 'ramda'
import { Container } from 'typedi'

import { ResponseError } from 'resolvers/types'
import UserService from './user-service'
import { User } from '../entities'

jest.mock('@fintruth-sdk/validation', () => ({
  object: () => ({
    shape: () => ({
      validate: () => Promise.resolve(true),
    }),
  }),
  string: () => ({
    email: jest.fn().mockReturnThis(),
    password: jest.fn().mockReturnThis(),
    required: jest.fn().mockReturnThis(),
  }),
}))

jest.mock('bcrypt', () => ({
  hash: () => 'hash',
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
  findById: () => Promise.resolve(userMock),
  findOne: () => Promise.resolve(userMock),
  save: async (partial: Partial<User>) => ({
    id: 'test',
    ...partial,
  }),
  update: () => Promise.resolve(true),
})

describe('UserService', () => {
  let service: UserService

  beforeEach(() => {
    service = Container.get(UserService)
    service.userRepository = getUserRepositoryMock()
  })

  afterEach(() => {
    Container.reset(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should save a new user', async () => {
      const result = await service.create('test@test.com', 'password')

      expect(result.user).toStrictEqual({
        id: 'test',
        email: 'test@test.com',
        password: 'hash',
      })
    })

    describe('user exists with password', () => {
      let user: Partial<User> = {
        id: 'test',
        email: 'test@test.com',
        validatePassword: jest.fn(equals('password')),
      }

      beforeEach(() => {
        service.userRepository = getUserRepositoryMock(user)
      })

      it('should fail using an existing email', async () => {
        const result = await service.create('test@test.com', 'password')

        expect(result.user).toBeUndefined()
        expect(result.error).toStrictEqual(
          new ResponseError('email is not available', expect.any(String))
        )
      })
    })
  })

  describe('update', () => {
    describe('user exists with password', () => {
      let user: Partial<User> = {
        id: 'test',
        email: 'test@test.com',
        validatePassword: jest.fn(equals('password')),
      }

      beforeEach(() => {
        service.userRepository = getUserRepositoryMock(user)
      })

      it('should update an existing user', async () => {
        const result = await service.update('test', 'password', {
          email: 'updated@test.com',
        })

        expect(result.user).toStrictEqual({
          id: 'test',
          email: 'updated@test.com',
          validatePassword: expect.any(Function),
        })
      })

      it('should fail using an invalid password', async () => {
        const result = await service.update('test', 'bad', {})

        expect(result.error).toStrictEqual(
          new ResponseError('incorrect password', expect.any(String))
        )
      })
    })

    it('should fail when user does not exist', async () => {
      const result = await service.update('test', 'password', {})

      expect(result.error).toStrictEqual(
        new ResponseError('user not found', expect.any(String))
      )
    })
  })
})
