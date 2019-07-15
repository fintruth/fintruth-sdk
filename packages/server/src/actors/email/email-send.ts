import SES, { Address } from 'aws-sdk/clients/ses'
import { ActorRef, dispatch, spawnStateless, stop } from 'nact'

import { Message, PoisonPill } from 'actors'
import { logAs } from 'logger'
import { Registration } from './emailer'
import * as templates from './templates'

const getParams = (
  subject: string,
  body: string,
  recipient: Address,
  sender: Address
) => ({
  Destination: { ToAddresses: [recipient] },
  Message: {
    Body: { Html: { Charset: 'UTF-8', Data: body } },
    Subject: { Charset: 'UTF-8', Data: subject },
  },
  Source: sender,
})

const log = logAs('EmailSend')

export const spawnEmailSend = (
  parent: ActorRef,
  ses: SES,
  sender: Address,
  url: string
) =>
  spawnStateless<Message>(parent, async (msg, ctx) => {
    dispatch(ctx.self, new PoisonPill())

    if (msg instanceof Registration) {
      const { name, token, recipient } = msg
      const { body, subject } = templates.registration(name, token, url)

      await ses.sendEmail(getParams(subject, body, recipient, sender)).promise()
    } else if (msg instanceof PoisonPill) {
      stop(ctx.self)
    } else {
      log(`Unknown message type: ${msg.type}`, 'error')
    }
  })
