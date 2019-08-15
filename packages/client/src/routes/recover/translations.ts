import { defineMessages } from 'react-intl'

const rootId = 'routes.recover'
const accountHelpId = `${rootId}.recoverForm.accountHelp`

export const accountHelp = defineMessages({
  description: {
    id: `${accountHelpId}.description`,
    defaultMessage: 'Already have email and password?',
    description: 'The description in the Account Help section',
  },
})
