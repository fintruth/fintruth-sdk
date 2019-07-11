import BaseUser from './base-user'
import Profile from './profile'

export default class User extends BaseUser {
  profile: Profile

  createdAt: string

  updatedAt: string
}
