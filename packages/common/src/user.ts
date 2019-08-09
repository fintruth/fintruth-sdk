import gql from 'graphql-tag'

import { BaseEntity } from './base-entity'
import { Email, emailPropsFragment } from './email'
import { Profile, profilePropsFragment } from './profile'
import { Response, responseErrorPropsFragment } from './response'

export type ShallowUser = Pick<
  User,
  'id' | 'isAdmin' | 'isTwoFactorAuthEnabled' | 'createdAt' | 'updatedAt'
>

export interface User extends BaseEntity {
  emails: Email[]
  isAdmin: boolean
  isTwoFactorAuthEnabled: boolean
  profile: Profile
}

export interface UserResponse extends Response {
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
