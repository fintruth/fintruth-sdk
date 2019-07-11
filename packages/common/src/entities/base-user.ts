import BaseProfile from './base-profile'

export default class BaseUser {
  id: string

  email: string

  isAdmin: boolean

  isTwoFactorAuthEnabled: boolean

  profile: BaseProfile
}
