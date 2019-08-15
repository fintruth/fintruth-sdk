import { defineMessages } from 'react-intl'

const rootId = 'form'
const fieldId = `${rootId}.field`
const submitId = `${rootId}.submit`
const successId = `${rootId}.success`

export const field = defineMessages({
  emailLabel: {
    id: `${fieldId}.emailLabel`,
    defaultMessage: 'Email',
    description: 'The label of a field',
  },
  emailConfirmLabel: {
    id: `${fieldId}.emailConfirmLabel`,
    defaultMessage: 'Confirm Email',
    description: 'The label of a field',
  },
  familyNameLabel: {
    id: `${fieldId}.familyNameLabel`,
    defaultMessage: 'Last Name',
    description: 'The label of a field',
  },
  givenNameLabel: {
    id: `${fieldId}.givenNameLabel`,
    defaultMessage: 'First Name',
    description: 'The label of a field',
  },
  passwordLabel: {
    id: `${fieldId}.passwordLabel`,
    defaultMessage: 'Password',
    description: 'The label of a field',
  },
  tokenLabel: {
    id: `${fieldId}.tokenLabel`,
    defaultMessage: 'Verification Code',
    description: 'The label of a field',
  },
})

export const submit = defineMessages({
  continue: {
    id: `${submitId}.continue`,
    defaultMessage: 'Continue',
    description: 'The text of a submit button',
  },
  recover: {
    id: `${submitId}.recover`,
    defaultMessage: 'Recover',
    description: 'The text of a submit button',
  },
  register: {
    id: `${submitId}.register`,
    defaultMessage: 'Register',
    description: 'The text of a submit button',
  },
  signIn: {
    id: `${submitId}.signIn`,
    defaultMessage: 'Sign in',
    description: 'The text of a submit button',
  },
})

export const success = defineMessages({
  verificationEmail: {
    id: `${successId}.verificationEmail`,
    defaultMessage: 'A verification email has been sent',
    description: 'The message displayed when a form is successfully submitted',
  },
})
