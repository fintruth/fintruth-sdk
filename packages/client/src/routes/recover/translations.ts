import { defineMessages } from 'react-intl'

const rootId = 'routes.recover'
const accountHelpId = `${rootId}.recoverForm.accountHelp`

export const accountHelp = defineMessages({
  description: {
    id: `${accountHelpId}.description`,
    defaultMessage: 'Already have email and password?',
    description: 'The description in the Account Help section',
  },
  settings: {
    id: `${accountHelpId}.settings`,
    defaultMessage: 'Settings',
    description: 'The Settings link in the Account Help section',
  },
  signIn: {
    id: `${accountHelpId}.signIn`,
    defaultMessage: 'Sign-In',
    description: 'The Sign-In link in the Account Help section',
  },
})
