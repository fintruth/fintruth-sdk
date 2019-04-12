import { Container } from 'typedi'

// import { Response } from 'resolvers/types'
import UserService from './user-service'
import { User } from '../entities'

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
  save: async (partial: Partial<User>) => ({
    id: 'test',
    ...partial,
  }),
  update: jest.fn(() => Promise.resolve(true)),
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
      const result = await service.create('email', 'password')

      expect(result.user).toStrictEqual({
        id: 'test',
        email: 'email',
        password: 'password',
      })
    })
  })
})
