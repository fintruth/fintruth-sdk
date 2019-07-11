import { Response } from './response'

export interface BaseProfile {
  userId: string
  familyName: string
  givenName: string
}

export interface Profile extends BaseProfile {
  createdAt: string
  updatedAt: string
}

export interface ProfileInput {
  familyName: string
  givenName: string
}

export interface BaseProfileResponse extends Response {
  profile?: BaseProfile
}

export interface ProfileResponse extends BaseProfileResponse {
  profile?: Profile
}
