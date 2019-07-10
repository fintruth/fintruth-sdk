import { BaseProfile } from 'entities'
import Response from './response'

export default class BaseProfileResponse extends Response {
  profile?: BaseProfile
}
