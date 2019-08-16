import { defineMessages } from 'react-intl'

const rootId = 'form'
const fieldId = `${rootId}.field`
const labelId = `${fieldId}.label`
const submitId = `${rootId}.submit`
const successId = `${rootId}.success`

export default {
  field: {
    label: defineMessages({
      email: {
        id: `${labelId}.email`,
        defaultMessage: 'Email',
        description: 'The label of a field',
      },
      emailConfirm: {
        id: `${labelId}.emailConfirm`,
        defaultMessage: 'Confirm Email',
        description: 'The label of a field',
      },
      familyName: {
        id: `${labelId}.familyName`,
        defaultMessage: 'Last Name',
        description: 'The label of a field',
      },
      givenName: {
        id: `${labelId}.givenName`,
        defaultMessage: 'First Name',
        description: 'The label of a field',
      },
      password: {
        id: `${labelId}.password`,
        defaultMessage: 'Password',
        description: 'The label of a field',
      },
      token: {
        id: `${labelId}.token`,
        defaultMessage: 'Verification Code',
        description: 'The label of a field',
      },
    }),
  },
  submit: defineMessages({
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
  }),
  success: defineMessages({
    verificationEmail: {
      id: `${successId}.verificationEmail`,
      defaultMessage: 'A verification email has been sent',
      description:
        'The message displayed when a form is successfully submitted',
    },
  }),
}
