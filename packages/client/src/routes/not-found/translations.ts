import { defineMessages } from 'react-intl'

const rootId = 'routes.notfound'

export const root = defineMessages({
  description: {
    id: `${rootId}.description`,
    defaultMessage:
      'Sorry, but the page you were trying to view does not exist.',
    description: 'The description of the Not Found page',
  },
  title: {
    id: `${rootId}.title`,
    defaultMessage: 'Page Not Found',
    description: 'The title of the Not Found page',
  },
})
