import Profile from './profile'

export default class User {
  id: string
  email: string
  password: string
  profile: Profile
  createdAt: Date
  updatedAt: Date
}
