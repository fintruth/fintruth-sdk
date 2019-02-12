import Profile from './profile'

export default class User {
  id: string
  email: string
  profile: Profile
  isTwoFactorEnabled: boolean
  createdAt: Date
  updatedAt: Date
}
