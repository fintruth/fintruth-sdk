import { defineMessages } from 'react-intl'

const rootId = 'routes.register'
const subnavbarId = `${rootId}.subnavbar`

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
