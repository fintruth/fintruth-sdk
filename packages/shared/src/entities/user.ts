import Profile from './profile'

export default class User {
  id: string
  email: string
  isAdmin: boolean
  isTwoFactorAuthEnabled: boolean
  profile: Profile
  createdAt: Date
  updatedAt: Date
}
