import gql from 'graphql-tag'

import { BaseEmail, Email, emailPropsFragment } from './email'
import { BaseProfile, Profile, profilePropsFragment } from './profile'
import { Response, responseErrorPropsFragment } from './response'

export type ShallowUser = Pick<
  User,
  'id' | 'isAdmin' | 'isTwoFactorAuthEnabled' | 'createdAt' | 'updatedAt'
>

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

export const shallowUserPropsFragment = gql`
  fragment ShallowUserProps on User {
    id
    isAdmin
    isTwoFactorAuthEnabled
    createdAt
    updatedAt
  }
`

export const userPropsFragment = gql`
  fragment UserProps on User {
    ...ShallowUserProps
    emails {
      ...EmailProps
    }
    profile {
      ...ProfileProps
    }
  }
  ${emailPropsFragment}
  ${profilePropsFragment}
  ${shallowUserPropsFragment}
`

export const userResponsePropsFragment = gql`
  fragment UserResponseProps on UserResponse {
    error {
      ...ResponseErrorProps
    }
    user {
      ...UserProps
    }
  }
  ${responseErrorPropsFragment}
  ${userPropsFragment}
`
