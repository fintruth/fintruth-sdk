import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import Layout from 'components/layout'
import { contentContainer, title } from 'styles/mixins'

const Root = styled.div`
  ${contentContainer};
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  padding: ${rem(48)} ${rem(24)};
`

const Title = styled.h1`
  ${title};
`

const Home: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => (
  <Layout {...rest}>
    <Root>
      <Title>Welcome Home!</Title>
    </Root>
  </Layout>
)

export default Home
