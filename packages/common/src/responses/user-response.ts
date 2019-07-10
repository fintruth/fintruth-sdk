import { User } from 'entities'
import Response from './response'

export default class UserResponse extends Response {
  user?: User
}
