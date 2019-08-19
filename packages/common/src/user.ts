import gql from 'graphql-tag'

import { BaseEntity, shallowBaseEntityPropsFragment } from './base-entity'
import { Email } from './email'
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

export const shallowUserPropsFragment = gql`
  fragment ShallowUserProps on User {
    ...ShallowBaseEntityProps
    isAdmin
    isTwoFactorAuthEnabled
  }

  ${shallowBaseEntityPropsFragment}
`
