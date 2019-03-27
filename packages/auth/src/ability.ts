import { Ability, AbilityBuilder } from '@casl/ability'
import { User } from '@fintruth-sdk/shared'

export const defineAbilitiesFor = (user?: User) => {
  const { rules, can } = AbilityBuilder.extract()

  can('create', 'User')

  if (user) {
    const { id } = user

    can(['read', 'update'], 'User', { id })
    can(['read', 'update'], 'Profile', { userId: id })
  }

  if (user && user.isAdmin) {
    can('manage', 'all')
  }

  return new Ability(rules)
}
