import { BaseEntity } from './base-entity'
import { Response } from './response'

export interface Profile extends BaseEntity {
  familyName: string
  givenName: string
  userId: string
}

export interface ProfileInput {
  familyName: string
  givenName: string
}

export interface ProfileResponse extends Response {
  profile?: Profile
}
