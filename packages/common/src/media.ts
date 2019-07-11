import { Response } from './response'

export interface BaseMedia {
  id: string
  mimeType: string
  name: string
  path: string
  type: MediaType
  typeId: string
}

export interface Media extends BaseMedia {
  createdAt: string
  updatedAt: string
}

export interface BaseMediaResponse extends Response {
  media?: BaseMedia
}

export interface MediaResponse extends BaseMediaResponse {
  media?: Media
}

export interface MediaType {
  id: string
  name: string
}
