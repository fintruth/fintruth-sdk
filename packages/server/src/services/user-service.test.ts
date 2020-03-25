/* eslint-disable dot-notation, @typescript-eslint/unbound-method */
import { equals } from 'ramda'
import { Container } from 'typedi'
import { DeepPartial } from 'typeorm'

import { Response, ResponseError, UserInput } from 'resolvers/types'
import UserService from './user-service'
import { Email, Profile, User } from '../entities'

jest.mock('bcrypt', () => ({
  hash: () => 'hash',
}))

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

const abilityMock: any = {
  throwUnlessCan: noop,
}

const getUserDaoMock: any = (userMock?: DeepPartial<User>) => ({
  addEmail: (_: string, email: Email) =>
    userMock && [...(userMock.emails || []), email],
  findByEmail: () => Promise.resolve(userMock),
  findById: () => Promise.resolve(userMock),
  findOne: () => Promise.resolve(userMock),
  save: (partial: Partial<User>) =>
    Promise.resolve({ id: 'userId', ...partial }),
  update: () => Promise.resolve(true),
})

const getEmailDaoMock: any = () => ({
  delete: () => Promise.resolve(),
  findByUser: () => Promise.resolve([]),
  findById: () => Promise.resolve(),
  save: () => Promise.resolve(),
})

const userMock: DeepPartial<User> = {
  id: 'userId',
  emails: [
    new Email({
      value: 'test@test.com',
    }),
  ],
  validatePassword: jest.fn(equals('password')),
}

describe('UserService', () => {
  let service: UserService

  afterEach(() => {
    Container.reset()
  })

  beforeEach(() => {
    service = Container.get(UserService)
    service.daos.emails = getEmailDaoMock()
    service.daos.users = getUserDaoMock()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('validateUser', () => {
    describe('user exists with password', () => {
      beforeEach(() => {
        service.daos.users = getUserDaoMock(userMock)
      })

      it('should return a response', async () => {
        const result = await service['validateUser']('userId')(() =>
          Promise.resolve(new Response())
        )

        expect(result).toStrictEqual(new Response())
      })
    })

    it('should return a failure response when the user does not exist', async () => {
      const result = await service['validateUser']('userId')(() =>
        Promise.resolve(new Response())
      )

      expect(result.error).toStrictEqual(
        new ResponseError('user not found', expect.any(String))
      )
    })
  })

  describe('validateUserPassword', () => {
    describe('user exists with password', () => {
      beforeEach(() => {
        service.daos.users = getUserDaoMock(userMock)
      })

      it('should return a response', async () => {
        const result = await service['validateUserPassword'](
          'userId',
          'password'
        )(() => Promise.resolve(new Response()))

        expect(result).toStrictEqual(new Response())
      })

      it('should return a failure response using an invalid password', async () => {
        const result = await service['validateUserPassword'](
          'userId',
          'bad'
        )(() => Promise.resolve(new Response()))

        expect(result.error).toStrictEqual(
          new ResponseError('incorrect password', expect.any(String))
        )
      })
    })

    it('should return a failure response when the user does not exist', async () => {
      const result = await service['validateUserPassword'](
        'userId',
        'password'
      )(() => Promise.resolve(new Response()))

      expect(result.error).toStrictEqual(
        new ResponseError('user not found', expect.any(String))
      )
    })
  })

  describe('addEmail', () => {
    describe('user exists with password', () => {
      beforeEach(() => {
        service.daos.users = getUserDaoMock(userMock)
      })

      it('should return a user response', async () => {
        service.daos.users.findByEmail = () => Promise.resolve(null) as any

        const result = await service.addEmail(
          'userId',
          'test1@test.com',
          abilityMock
        )

        expect(result.user).toStrictEqual({
          id: 'userId',
          emails: expect.any(Array),
          validatePassword: expect.any(Function),
        })
      })

      it('should return a failure response using an invalid email', async () => {
        const result = await service.addEmail('userId', 'invalid', abilityMock)

        expect(result.error).toStrictEqual(
          new ResponseError('invalid data provided', expect.any(String))
        )
      })

      it('should return a failure response using a taken email', async () => {
        const result = await service.addEmail(
          'userId',
          'test@test.com',
          abilityMock
        )

        expect(result.error).toStrictEqual(
          new ResponseError('email is not available', expect.any(String))
        )
      })
    })

    it('should return a failure response when the user does not exist', async () => {
      const result = await service.addEmail(
        'userId',
        'test@test.com',
        abilityMock
      )

      expect(result.error).toStrictEqual(
        new ResponseError('user not found', expect.any(String))
      )
    })
  })

  describe('create', () => {
    const input: UserInput = {
      email: 'test@test.com',
      password: 'Asdfg2345!',
      profile: new Profile({
        familyName: 'familyName',
        givenName: 'givenName',
      }),
    }

    it('should return a user', async () => {
      const result = await service.create(input)

      expect(result.user).toStrictEqual({
        id: 'userId',
        emails: [expect.any(Email)],
        isAdmin: false,
        password: 'hash',
        profile: expect.any(Profile),
      })
    })

    describe('user exists with password', () => {
      beforeEach(() => {
        service.daos.users = getUserDaoMock(userMock)
      })

      it('should return a failure response using an existing email', async () => {
        service.daos.users.findByEmail = () => Promise.resolve(new User())

        const result = await service.create(input)

        expect(result.error).toStrictEqual(
          new ResponseError('email is not available', expect.any(String))
        )
      })
    })
  })

  describe('removeEmail', () => {
    describe('user exists with password', () => {
      beforeEach(() => {
        service.daos.users = getUserDaoMock(userMock)
      })

      it('should return a user response', async () => {
        service.daos.emails.findById = () =>
          Promise.resolve(new Email({ value: 'test@test.com' }))

        const result = await service.removeEmail(
          'userId',
          'emailId',
          abilityMock
        )

        expect(result.user).toStrictEqual({
          id: 'userId',
          emails: expect.any(Array),
          validatePassword: expect.any(Function),
        })
      })

      it('should return a failure response using a primary email', async () => {
        service.daos.emails.findById = () =>
          Promise.resolve(
            new Email({ value: 'test@test.com', isPrimary: true })
          )

        const result = await service.removeEmail(
          'userId',
          'emailId',
          abilityMock
        )

        expect(result.error).toStrictEqual(
          new ResponseError('unable to remove email', expect.any(String))
        )
      })
    })

    it('should return a failure response when the user does not exist', async () => {
      service.daos.emails.findById = () =>
        Promise.resolve(new Email({ value: 'test@test.com' }))

      const result = await service.removeEmail('userId', 'emailId', abilityMock)

      expect(result.error).toStrictEqual(
        new ResponseError('user not found', expect.any(String))
      )
    })
  })

  describe('update', () => {
    it('should return a user', async () => {
      service.daos.users = getUserDaoMock(userMock)

      const result = await service.update('userId', 'password', {}, abilityMock)

      expect(result.user).toStrictEqual(userMock)
    })

    it('should return a failure response when the user does not exist', async () => {
      const result = await service.update('userId', 'password', {}, abilityMock)

      expect(result.error).toStrictEqual(
        new ResponseError('user not found', expect.any(String))
      )
    })
  })
})
