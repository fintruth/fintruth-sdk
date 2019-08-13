import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import styled from 'styled-components'

import Layout from 'components/layout'
import { container, title } from 'styles/mixins'

type Props = RouteComponentProps

const messages = defineMessages({
  title: {
    id: 'routes.home.title',
    defaultMessage: 'Welcome Home!',
    description: 'The title of the Home page',
  },
})

const Root = styled.div`
  ${container()};
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  padding: ${rem(48)} ${rem(24)};
`

const Title = styled.h2`
  ${title};
  font-size: ${rem(40)};
`

const Home: React.FunctionComponent<Props> = (props: Props) => (
  <Layout data-testid="home" {...props}>
    <Root>
      <Title>
        <FormattedMessage {...messages.title} />
      </Title>
    </Root>
  </Layout>
)

export default Home
