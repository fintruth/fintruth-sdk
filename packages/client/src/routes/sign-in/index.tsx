import { User } from '@fintruth-sdk/common'
import { Redirect, RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import BaseSubnavbar from 'components/subnavbar'
import SignInForm from './sign-in-form'
import SignInTwoFactorAuthForm, {
  SignInCredentials,
} from './sign-in-two-factor-auth-form'

type Step = 'signIn' | 'signInTwoFactorAuth' | 'redirect'

const items = [
  { id: 'sign-in', content: 'SIGN IN', to: '/sign-in' },
  { id: 'register', content: 'REGISTER', to: '/register' },
]

const getNextStep = (currentStep: Step, { isTwoFactorAuthEnabled }: User) => {
  if (currentStep === 'signIn' && isTwoFactorAuthEnabled) {
    return 'signInTwoFactorAuth'
  }

  return 'redirect'
}

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

const SignIn: React.FunctionComponent<RouteComponentProps> = ({
  ...props
}: RouteComponentProps) => {
  const [currentStep, setCurrentStep] = React.useState<Step>('signIn')
  const [signInCredentials, setSignInCredentials] = React.useState<
    SignInCredentials
  >()

  if (currentStep === 'signInTwoFactorAuth') {
    return (
      <Root data-testid="sign-in" {...props}>
        <Content>
          <SignInTwoFactorAuthForm
            onCompleted={(user: User) =>
              setCurrentStep(getNextStep(currentStep, user))
            }
            signInCredentials={signInCredentials}
          />
        </Content>
      </Root>
    )
  } else if (currentStep === 'redirect') {
    return <Redirect from="/sign-in" noThrow to="/" />
  }

  return (
    <Root data-testid="sign-in" {...props}>
      <Content>
        <Subnavbar items={items} />
        <SignInForm
          onCompleted={(user: User) =>
            setCurrentStep(getNextStep(currentStep, user))
          }
          setSignInCredentials={setSignInCredentials}
        />
      </Content>
    </Root>
  )
}

export default SignIn
