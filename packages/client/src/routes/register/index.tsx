import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import styled from 'styled-components'

import BaseSubnavbar from 'components/subnavbar'
import RegisterForm from './register-form'

type Props = RouteComponentProps

const messages = defineMessages({
  subnavbarSignIn: {
    id: 'routes.register.subnavbarSignIn',
    defaultMessage: 'Sign-In',
    description: 'The Sign-In link in the subnavbar',
  },
  subnavbarRegister: {
    id: 'routes.register.subnavbarRegister',
    defaultMessage: 'Register',
    description: 'The Register link in the subnavbar',
  },
})

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

const Register: React.FunctionComponent<Props> = (props: Props) => {
  const { formatMessage } = useIntl()

  const items = [
    {
      id: 'sign-in',
      content: formatMessage(messages.subnavbarSignIn),
      to: '/sign-in',
    },
    {
      id: 'register',
      content: formatMessage(messages.subnavbarRegister),
      to: '/register',
    },
  ]

  return (
    <Root data-testid="register" {...props}>
      <Content>
        <Subnavbar items={items} />
        <RegisterForm />
      </Content>
    </Root>
  )
}

export default Register
