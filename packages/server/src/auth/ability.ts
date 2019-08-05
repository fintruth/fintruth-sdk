import { AbilityBuilder } from '@casl/ability'

import { Country, Email, Profile, User } from '../entities'

export const defineAbilitiesFor = (user?: User) =>
  AbilityBuilder.define((can: any) => {
    can('read', Country)

    if (user) {
      const { id, isAdmin } = user

      if (isAdmin) {
        can('manage', 'all')
      } else {
        can(['read', 'update'], User, { id })
        can(['read', 'update'], Profile, { userId: id })
        can('manage', Email, { userId: id })
      }
    }
  })
