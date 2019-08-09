import { BaseEntity } from './base-entity'
import { Response } from './response'

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
