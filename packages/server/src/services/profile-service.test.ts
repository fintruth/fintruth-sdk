import { T } from 'ramda'
import { Container } from 'typedi'

import ProfileService from './profile-service'
import { Profile } from '../entities'

const abilityMock: any = {
  can: T,
  throwUnlessCan: () => {},
}

const getProfileDaoMock: any = (profileMock?: Partial<Profile>) => ({
  findOneOrFail: () => Promise.resolve(profileMock),
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

  describe('update', () => {
    beforeEach(() => {
      service.daos.profiles = getProfileDaoMock(profileMock)
    })

    it('should update an existing profile', async () => {
      const result = await service.update(
        'profileId',
        {
          familyName: 'familyName',
          givenName: 'givenName',
        },
        abilityMock
      )

      expect(result.profile).toStrictEqual({
        id: 'profileId',
        familyName: 'familyName',
        givenName: 'givenName',
      })
    })
  })
})
