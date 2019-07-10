import { BaseMedia } from 'entities'
import Response from './response'

export default class BaseMediaResponse extends Response {
  media?: BaseMedia
}
