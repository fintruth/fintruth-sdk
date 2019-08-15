import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { subtitle, title } from 'styles/mixins'
import { root } from './translations'

type Props = RouteComponentProps

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
      <FormattedMessage {...root.title} />
    </Title>
    <Subtitle>
      <FormattedMessage {...root.description} />
    </Subtitle>
  </Root>
)

export default NotFound
