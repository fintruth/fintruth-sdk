import { ProfileInput } from './profile'

export interface RegisterInput {
  email: string
  password: string
  profile: ProfileInput
}
