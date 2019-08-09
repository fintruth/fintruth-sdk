import { T } from 'ramda'
import { Container } from 'typedi'

import ProfileService from './profile-service'
import { Profile } from '../entities'

const abilityMock: any = {
  can: T,
  throwUnlessCan: () => {},
}

const getProfileDaoMock: any = (profileMock?: Partial<Profile>) => ({
  findOneOrFail: async () => profileMock,
  findByUser: async () => profileMock,
  save: async (partial: Partial<Profile>) => ({
    id: 'profileId',
    ...partial,
  }),
  update: () => Promise.resolve(true),
})

const profileMock: Partial<Profile> = {
  id: 'profileId',
}

describe('ProfileService', () => {
  let service: ProfileService

  afterEach(() => {
    Container.reset()
  })

  beforeEach(() => {
    service = Container.get(ProfileService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('updateByUser', () => {
    beforeEach(() => {
      service.daos.profiles = getProfileDaoMock(profileMock)
    })

    it('should return a profile', async () => {
      const result = await service.updateByUser(
        'userId',
        { familyName: 'a', givenName: 'b' },
        abilityMock
      )

      expect(result.error).toBeUndefined()
    })
  })
})
