import SES, { Address } from 'aws-sdk/clients/ses'
import { ActorRef, dispatch, spawnStateless } from 'nact'

import { Message } from 'actors'
import { spawnEmailSend } from './email-send'

export interface EmailType extends Message {
  recipient: string
}

export class Registration implements EmailType {
  readonly type = 'Registration'

  constructor(
    readonly recipient: string,
    readonly name: string,
    readonly token: string
  ) {}
}

export const spawnEmailer = (
  parent: ActorRef,
  ses: SES,
  sender: Address,
  serverUrl: string
) =>
  spawnStateless<EmailType>(
    parent,
    (msg, { self }) => {
      const actor = spawnEmailSend(self, ses, sender, serverUrl)

      return dispatch(actor, msg, self)
    },
    'emailer'
  )
