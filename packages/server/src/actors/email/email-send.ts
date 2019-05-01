import SES, { Address } from 'aws-sdk/clients/ses'
import { ActorRef, dispatch, spawnStateless, stop } from 'nact'

import { Message, PoisonPill } from 'actors'
import { logAs } from 'logger'
import { Registration } from './emailer'
import registrationTemplate from './templates/registration'

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

export const spawnEmailSend = (
  parent: ActorRef,
  ses: SES,
  sender: Address,
  serverUrl: string
) =>
  spawnStateless<Message>(
    parent,
    (msg, ctx) => {
      dispatch(ctx.self, new PoisonPill())

      switch (msg.type) {
        case 'Registration':
          const { name, token, recipient } = msg as Registration
          const { body, subject } = registrationTemplate(name, token, serverUrl)

          return ses
            .sendEmail(getParams(subject, body, recipient, sender))
            .promise()
        case 'PoisonPill':
          return stop(ctx.self)
        default:
          return logAs('EmailSend')(
            `Unknown message type: ${msg.type}`,
            'error'
          )
      }
    },
    'emailSend'
  )
