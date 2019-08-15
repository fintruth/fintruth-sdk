import { defineMessages } from 'react-intl'

const rootId = 'routes.signIn'
const accountHelpId = `${rootId}.signInForm.accountHelp`

export const accountHelp = defineMessages({
  recover: {
    id: `${accountHelpId}.recover`,
    defaultMessage: 'Forgot your password?',
    description: 'The Recover link in the Account Help section',
  },
})
