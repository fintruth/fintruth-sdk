import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import Layout from 'components/layout'
import { centered, fill, title } from 'styles/deprecated'
import { container } from 'styles/mixins'

const Root = styled.div`
  ${container()};
  ${centered};
  ${fill};
  padding: ${rem(48)} ${rem(24)};
`

const Title = styled.h1`
  ${title};
  font-size: ${rem(36)};
`

const Home: React.FunctionComponent<RouteComponentProps> = ({
  ...props
}: RouteComponentProps) => (
  <Layout data-testid="home" {...props}>
    <Root>
      <Title>Welcome Home!</Title>
    </Root>
  </Layout>
)

export default Home
