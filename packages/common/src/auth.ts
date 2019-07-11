import { Response } from './response'

export interface EnableTwoFactorAuthResponse extends Response {
  dataUrl?: string
  secret?: string
}
