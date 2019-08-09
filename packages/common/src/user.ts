import { Email } from './email'
import { BaseEntity } from './base-entity'
import { Profile } from './profile'
import { Response } from './response'

export interface User extends BaseEntity {
  emails: Email[]
  isAdmin: boolean
  isTwoFactorAuthEnabled: boolean
  profile: Profile
}

export interface UserResponse extends Response {
  user?: User
}
