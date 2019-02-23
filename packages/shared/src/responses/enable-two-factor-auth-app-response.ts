import Response from './response'

export default class EnableTwoFactorAuthAppResponse extends Response {
  dataUrl?: string
  secret?: string
}
