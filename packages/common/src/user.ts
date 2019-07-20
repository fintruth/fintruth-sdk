import { BaseEmail, Email } from './email'
import { BaseProfile, Profile } from './profile'
import { Response } from './response'

export interface BaseUser {
  id: string
  emails: BaseEmail[]
  isAdmin: boolean
  isTwoFactorAuthEnabled: boolean
  profile: BaseProfile
}

export interface User extends BaseUser {
  emails: Email[]
  profile: Profile
  createdAt: string
  updatedAt: string
}

export interface BaseUserResponse extends Response {
  user?: BaseUser
}

export interface UserResponse extends BaseUserResponse {
  user?: User
}
