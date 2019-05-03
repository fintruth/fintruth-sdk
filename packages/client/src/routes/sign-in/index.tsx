import React from 'react'
import styled from 'styled-components'
import { Redirect, RouteComponentProps } from '@reach/router'
import { User } from '@fintruth-sdk/shared'

import { centered } from 'styles/mixins'
import SignInForm from './sign-in-form'
import SignInTwoFactorAuthForm, {
  SignInCredentials,
} from './sign-in-two-factor-auth-form'

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
  ...props
}: RouteComponentProps) => {
  const [currentView, setCurrentView] = React.useState(SIGN_IN_VIEW)
  const [signInCredentials, setSignInCredentials] = React.useState<
    SignInCredentials
  >({ email: '', password: '' })

  if (currentView === TWO_FACTOR_AUTH_VIEW) {
    return (
      <Root data-testid="sign-in" {...props}>
        <SignInTwoFactorAuthForm
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
    <Root data-testid="sign-in" {...props}>
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
