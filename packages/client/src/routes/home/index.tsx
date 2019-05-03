import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'

import Layout from 'components/layout'
import { centered, content, fill, title } from 'styles/mixins'

const Root = styled.div`
  ${centered};
  ${content};
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
