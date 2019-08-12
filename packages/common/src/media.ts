import gql from 'graphql-tag'

import { BaseEntity, shallowBaseEntityPropsFragment } from './base-entity'
import { Response } from './response'

export interface ShallowMedia extends BaseEntity {
  mimeType: string
  name: string
  path: string
  typeId: string
}

export interface Media extends ShallowMedia {
  type: MediaType
}

export interface MediaResponse extends Response {
  media?: Media
}

export interface MediaType {
  id: string
  name: string
}

export const shallowMediaTypePropsFragment = gql`
  fragment ShallowMediaTypeProps on MediaType {
    id
    name
  }
`

export const shallowMediaPropsFragment = gql`
  fragment ShallowMediaProps on Media {
    ...ShallowBaseEntityProps
    mimeType
    name
    path
    typeId
  }

  ${shallowBaseEntityPropsFragment}
`
