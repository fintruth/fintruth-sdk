import { Profile } from 'entities'
import Response from './response'

export default class ProfileResponse extends Response {
  profile?: Profile
}
