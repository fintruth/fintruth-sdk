import { useApolloClient } from '@apollo/react-hooks'
import { RouteComponentProps, navigate } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import Loading from 'components/loading'
import BaseSubnavbar from 'components/subnavbar'
import { CurrentUserQueryData, currentUserQuery } from './graphql'
import SignInForm from './sign-in-form'
import SignInTwoFactorAuthForm, {
  SignInCredentials,
} from './sign-in-two-factor-auth-form'
import { subnavbar } from './translations'

type Props = RouteComponentProps

type Step = 'signIn' | 'signInTwoFactorAuth' | 'redirect'

const getNextStep = (
  currentStep: Step,
  isTwoFactorAuthEnabled: boolean = false
) =>
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

const Subnavbar = styled(BaseSubnavbar)`
  margin-bottom: ${rem(50)};
`

const SignIn: React.FunctionComponent<Props> = (props: Props) => {
  const [currentStep, setCurrentStep] = React.useState<Step>('signIn')
  const [signInCredentials, setSignInCredentials] = React.useState<
    SignInCredentials
  >({ email: '', password: '' })
  const { formatMessage } = useIntl()
  const client = useApolloClient()

  const items = [
    {
      id: 'sign-in',
      content: formatMessage(subnavbar.signIn),
      to: '/sign-in',
    },
    {
      id: 'register',
      content: formatMessage(subnavbar.register),
      to: '/register',
    },
  ]

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
        <Subnavbar items={items} />
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
