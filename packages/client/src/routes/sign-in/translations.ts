import { defineMessages } from 'react-intl'

const rootId = 'routes.signIn'
const accountHelpId = `${rootId}.signInForm.accountHelp`
const subnavbarId = `${rootId}.subnavbar`

export const accountHelp = defineMessages({
  recover: {
    id: `${accountHelpId}.recover`,
    defaultMessage: 'Forgot your password?',
    description: 'The Recover link in the Account Help section',
  },
})

export const subnavbar = defineMessages({
  register: {
    id: `${subnavbarId}.register`,
    defaultMessage: 'Register',
    description: 'The Register link in the subnavbar',
  },
  signIn: {
    id: `${subnavbarId}.signIn`,
    defaultMessage: 'Sign-In',
    description: 'The Sign-In link in the subnavbar',
  },
})
