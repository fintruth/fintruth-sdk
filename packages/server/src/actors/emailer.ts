import { ActorRef, spawnStateless } from 'nact'

import { logAs } from 'logger'
import { EmailType } from './types'

export class Registration implements EmailType {
  readonly type = 'Registration'

  constructor(
    readonly recipient: string,
    readonly name: string,
    readonly token: string
  ) {}
}

export const spawnEmailer = (parent: ActorRef) =>
  spawnStateless<EmailType>(
    parent,
    (msg: EmailType) => {
      switch (msg.type) {
        case 'Registration':
          const { recipient, name } = msg as Registration

          return logAs('EmailerActor')(`Mail ${recipient} :: ${name}`, 'info')
        default:
          return logAs('EmailerActor')(`unknown message...`, 'info')
      }
    },
    'emailer'
  )
