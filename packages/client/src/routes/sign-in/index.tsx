import React from 'react'
import styled from 'styled-components'
import { Redirect, RouteComponentProps } from '@reach/router'
import { User } from '@fintruth-sdk/shared'

import { centered } from 'styles/mixins'
import SignInForm from './sign-in-form'
import TwoFactorAuthForm, { SignInCredentials } from './two-factor-auth-form'

const FINAL_VIEW = 'FINAL_VIEW'
const SIGN_IN_VIEW = 'SIGN_IN_VIEW'
const TWO_FACTOR_AUTH_VIEW = 'TWO_FACTOR_AUTH_VIEW'

const Root = styled.div`
  ${centered};
  flex-direction: column;
  min-height: 100vh;
`

const getNextView = (currentView: string, { isTwoFactorAuthEnabled }: User) => {
  if (currentView === SIGN_IN_VIEW && isTwoFactorAuthEnabled) {
    return TWO_FACTOR_AUTH_VIEW
  }

  return FINAL_VIEW
}

const SignIn: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => {
  const [currentView, setCurrentView] = React.useState(SIGN_IN_VIEW)
  const [signInCredentials, setSignInCredentials] = React.useState<
    SignInCredentials
  >({ email: '', password: '' })

  if (currentView === TWO_FACTOR_AUTH_VIEW) {
    return (
      <Root {...rest}>
        <TwoFactorAuthForm
          resolveNextView={(user: User) =>
            setCurrentView(getNextView(currentView, user))
          }
          signInCredentials={signInCredentials}
        />
      </Root>
    )
  } else if (currentView === FINAL_VIEW) {
    return <Redirect from="/sign-in" noThrow to="/" />
  }

  return (
    <Root {...rest}>
      <SignInForm
        resolveNextView={(user: User) =>
          setCurrentView(getNextView(currentView, user))
        }
        setSignInCredentials={setSignInCredentials}
      />
    </Root>
  )
}

export default SignIn
