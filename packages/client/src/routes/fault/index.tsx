import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { jet } from 'styles/deprecated'

interface Props extends RouteComponentProps {
  error?: any
}

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  justify-content: center;
  min-height: 100vh;
  padding: 0 ${rem(32)};
`

const Title = styled.h1`
  color: ${jet};
  font-weight: 400;
`

const Content = styled.pre`
  text-align: left;
  white-space: pre-wrap;
`

const Fault: React.FunctionComponent<Props> = ({ error, ...props }: Props) =>
  __IS_DEV__ && error ? (
    <Root data-testid="error" {...props}>
      <Title>{error.name}</Title>
      <Content>{error.stack}</Content>
    </Root>
  ) : (
    <Root data-testid="error" {...props}>
      <Title>Error</Title>
      <p>Sorry, a critical error occurred on this page.</p>
    </Root>
  )

export default Fault
