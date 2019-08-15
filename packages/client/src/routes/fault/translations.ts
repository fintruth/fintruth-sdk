import { defineMessages } from 'react-intl'

const rootId = 'routes.fault'

export const root = defineMessages({
  description: {
    id: `${rootId}.description`,
    defaultMessage: 'Sorry, a critical error occurred on this page.',
    description: 'The description of the Fault page',
  },
  title: {
    id: `${rootId}.title`,
    defaultMessage: 'Error',
    description: 'The title of the Fault page',
  },
})
