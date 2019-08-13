import gql from 'graphql-tag'

import { Primitive, SubType } from 'utils'
import { BaseEntity, shallowBaseEntityPropsFragment } from './base-entity'
import { Response } from './response'

export type ShallowMedia = SubType<Media, Primitive>

export type ShallowMediaType = SubType<MediaType, Primitive>

export interface Media extends BaseEntity {
  mimeType: string
  name: string
  path: string
  type: MediaType
  typeId: string
}

export interface MediaResponse extends Response {
  media?: Media
}

export interface MediaType {
  id: string
  name: string
}

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

export const shallowMediaTypePropsFragment = gql`
  fragment ShallowMediaTypeProps on MediaType {
    id
    name
  }
`
