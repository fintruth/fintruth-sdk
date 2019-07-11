import { equals } from 'ramda'
import { Container } from 'typedi'

import { ResponseError } from 'resolvers/types'
import UserService from './user-service'
import { Profile, User } from '../entities'

jest.mock('bcrypt', () => ({
  hash: () => 'hash',
}))

const getUserDaoMock: any = (userMock?: Partial<User>) => ({
  findByEmail: () => Promise.resolve(null),
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
    service.userDao = getUserDaoMock()
  })

  afterEach(() => {
    Container.reset(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should save a new user', async () => {
      const result = await service.create(
        'test@test.com',
        'Asdfg2345!',
        new Profile({
          familyName: '',
          givenName: '',
        })
      )

      expect(result.user).toStrictEqual({
        id: 'test',
        email: 'test@test.com',
        password: 'hash',
        profile: new Profile({
          familyName: '',
          givenName: '',
        }),
      })
    })

    describe('user exists with password', () => {
      const user: Partial<User> = {
        id: 'test',
        email: 'test@test.com',
        validatePassword: jest.fn(equals('password')),
      }

      beforeEach(() => {
        service.userDao = getUserDaoMock(user)
      })

      it('should fail using an existing email', async () => {
        service.userDao.findByEmail = () => Promise.resolve(new User())

        const result = await service.create(
          'test@test.com',
          'Asdfg2345!',
          new Profile({
            familyName: '',
            givenName: '',
          })
        )

        expect(result.error).toStrictEqual(
          new ResponseError('email is not available', expect.any(String))
        )
      })
    })
  })

  describe('update', () => {
    describe('user exists with password', () => {
      const user: Partial<User> = {
        id: 'test',
        email: 'test@test.com',
        validatePassword: jest.fn(equals('password')),
      }

      beforeEach(() => {
        service.userDao = getUserDaoMock(user)
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
