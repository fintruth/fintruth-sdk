import { defineMessages } from 'react-intl'

const rootId = 'navigation'
const routeId = `${rootId}.route`

export default {
  route: defineMessages({
    register: {
      id: `${routeId}.register`,
      defaultMessage: 'Register',
      description: 'The text of a local route link',
    },
    settings: {
      id: `${routeId}.settings`,
      defaultMessage: 'Settings',
      description: 'The text of a local route link',
    },
    signIn: {
      id: `${routeId}.signIn`,
      defaultMessage: 'Sign In',
      description: 'The text of a local route link',
    },
  }),
}
