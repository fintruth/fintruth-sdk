import User from 'entities/user'
import Response from './response'

export default class UserResponse extends Response {
  user?: User
}
