import { T } from 'ramda'
import { Container } from 'typedi'

import ProfileService from './profile-service'
import { Profile } from '../entities'

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

const abilityMock: any = {
  can: T,
  throwUnlessCan: noop,
}

const getProfileDaoMock: any = (profileMock?: Partial<Profile>) => ({
  findOneOrFail: () => Promise.resolve(profileMock),
  findByUser: () => Promise.resolve(profileMock),
  save: (partial: Partial<Profile>) =>
    Promise.resolve({ id: 'profileId', ...partial }),
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

    it('should return a response', async () => {
      const result = await service.updateByUser(
        'userId',
        { familyName: 'a', givenName: 'b' },
        abilityMock
      )

      expect(result.error).toBeUndefined()
    })
  })
})
