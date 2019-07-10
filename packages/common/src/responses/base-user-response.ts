import { BaseUser } from 'entities'
import Response from './response'

export default class BaseUserResponse extends Response {
  user?: BaseUser
}
