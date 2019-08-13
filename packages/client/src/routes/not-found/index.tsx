import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import styled from 'styled-components'

import { subtitle, title } from 'styles/mixins'

type Props = RouteComponentProps

const messages = defineMessages({
  title: {
    id: 'routes.notfound.title',
    defaultMessage: 'Page Not Found',
    description: 'The title of the Not Found page',
  },
  description: {
    id: 'routes.notfound.description',
    defaultMessage:
      'Sorry, but the page you were trying to view does not exist.',
    description: 'The description of the Not Found page',
  },
})

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`

const Title = styled.h3`
  ${title};
`

const Subtitle = styled.h5`
  ${subtitle};
  margin-top: ${rem(-20)};
  width: ${rem(280)};
`

const NotFound: React.FunctionComponent<Props> = (props: Props) => (
  <Root data-testid="not-found" {...props}>
    <Title>
      <FormattedMessage {...messages.title} />
    </Title>
    <Subtitle>
      <FormattedMessage {...messages.description} />
    </Subtitle>
  </Root>
)

export default NotFound
