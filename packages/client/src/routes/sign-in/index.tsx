import { useApolloClient } from '@apollo/react-hooks'
import { RouteComponentProps, navigate } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import Loading from 'components/loading'
import BaseTabs, { Tab, TabList } from 'components/tabs'
import { navigation } from 'translations'
import { CurrentUserQueryData, currentUserQuery } from './graphql'
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
  const client = useApolloClient()

  React.useEffect(() => {
    if (currentStep === 'redirect') {
      client
        .query<CurrentUserQueryData>({
          fetchPolicy: 'network-only',
          query: currentUserQuery,
        })
        .then(({ data }) => data.user && navigate('/', { replace: true }))
        .catch(error => __IS_DEV__ && console.error(error))
    }
  }, [client, currentStep])

  if (currentStep === 'signInTwoFactorAuth') {
    return (
      <Root data-testid="sign-in" {...props}>
        <Content>
          <SignInTwoFactorAuthForm
            onCompleted={isTwoFactorAuthEnabled =>
              setCurrentStep(getNextStep(currentStep, isTwoFactorAuthEnabled))
            }
            signInCredentials={signInCredentials}
          />
        </Content>
      </Root>
    )
  } else if (currentStep === 'redirect') {
    return (
      <Root data-testid="sign-in" {...props}>
        <Content>
          <Loading />
        </Content>
      </Root>
    )
  }

  return (
    <Root data-testid="sign-in" {...props}>
      <Content>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab onClick={() => navigate('/sign-in')}>
              <FormattedMessage {...navigation.route.signIn} />
            </Tab>
            <Tab onClick={() => navigate('/register')}>
              <FormattedMessage {...navigation.route.register} />
            </Tab>
          </TabList>
        </Tabs>
        <SignInForm
          onCompleted={isTwoFactorAuthEnabled =>
            setCurrentStep(getNextStep(currentStep, isTwoFactorAuthEnabled))
          }
          setSignInCredentials={setSignInCredentials}
        />
      </Content>
    </Root>
  )
}

export default SignIn
