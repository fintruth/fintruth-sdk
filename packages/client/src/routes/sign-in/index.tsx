import { RouteComponentProps, navigate } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import BaseTabs, { Tab, TabList } from 'components/tabs'
import { navigation } from 'i18n'
import SignInForm from './sign-in-form'
import SignInTwoFactorAuthForm, {
  SignInCredentials,
} from './sign-in-two-factor-auth-form'

type Props = RouteComponentProps

type Step = 'signIn' | 'signInTwoFactorAuth' | 'redirect'

const getNextStep = (currentStep: Step, isTwoFactorAuthEnabled = false) =>
  currentStep === 'signIn' && isTwoFactorAuthEnabled
    ? 'signInTwoFactorAuth'
    : 'redirect'

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

const Tabs = styled(BaseTabs)`
  margin-bottom: ${rem(50)};
`

const SignIn: React.FunctionComponent<Props> = (props: Props) => {
  const [currentStep, setCurrentStep] = React.useState<Step>('signIn')
  const [signInCredentials, setSignInCredentials] = React.useState<
    SignInCredentials
  >({ email: '', password: '' })

  const onCompleted = (isTwoFactorAuthEnabled?: boolean) => {
    const nextStep = getNextStep(currentStep, isTwoFactorAuthEnabled)

    return nextStep === 'redirect'
      ? navigate('/', { replace: true })
      : setCurrentStep(nextStep)
  }

  if (currentStep === 'signInTwoFactorAuth') {
    return (
      <Root data-testid="sign-in" {...props}>
        <Content>
          <SignInTwoFactorAuthForm
            onCompleted={onCompleted}
            signInCredentials={signInCredentials}
          />
        </Content>
      </Root>
    )
  }

  return (
    <Root data-testid="sign-in" {...props}>
      <Content>
        <Tabs
          defaultIndex={0}
          onChange={(index) => navigate(index === 0 ? '/sign-in' : '/register')}
        >
          <TabList>
            <Tab>
              <FormattedMessage {...navigation.route.signIn} />
            </Tab>
            <Tab>
              <FormattedMessage {...navigation.route.register} />
            </Tab>
          </TabList>
        </Tabs>
        <SignInForm
          onCompleted={onCompleted}
          setSignInCredentials={setSignInCredentials}
        />
      </Content>
    </Root>
  )
}

export default SignIn
