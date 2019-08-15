import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import Layout from 'components/layout'
import { container, title } from 'styles/mixins'
import { root } from './translations'

type Props = RouteComponentProps

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
        <FormattedMessage {...root.title} />
      </Title>
    </Root>
  </Layout>
)

export default Home
