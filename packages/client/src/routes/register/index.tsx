import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import BaseSubnavbar from 'components/subnavbar'
import RegisterForm from './register-form'

const items = [
  { id: 'sign-in', content: 'SIGN IN', to: '/sign-in' },
  { id: 'register', content: 'REGISTER', to: '/register' },
]

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: ${rem(280)};
`

const Subnavbar = styled(BaseSubnavbar)`
  margin-bottom: ${rem(50)};
`

const Register: React.FunctionComponent<RouteComponentProps> = ({
  ...props
}: RouteComponentProps) => (
  <Root data-testid="register" {...props}>
    <Content>
      <Subnavbar items={items} />
      <RegisterForm />
    </Content>
  </Root>
)

export default Register
