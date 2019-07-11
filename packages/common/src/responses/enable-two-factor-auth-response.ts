import Response from './response'

export default class EnableTwoFactorAuthResponse extends Response {
  dataUrl?: string

  secret?: string
}
