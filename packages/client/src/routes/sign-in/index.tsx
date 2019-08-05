import { useApolloClient } from '@apollo/react-hooks'
import { User } from '@fintruth-sdk/common'
import { RouteComponentProps, navigate } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import Loading from 'components/loading'
import BaseSubnavbar from 'components/subnavbar'
import { CurrentUserQueryData, currentUserQuery } from './graphql'
import SignInForm from './sign-in-form'
import SignInTwoFactorAuthForm, {
  SignInCredentials,
} from './sign-in-two-factor-auth-form'

type GetNextStep = (user: User) => Step

type Props = RouteComponentProps

type Step = 'signIn' | 'signInTwoFactorAuth' | 'redirect'

const items = [
  { id: 'sign-in', content: 'Sign In', to: '/sign-in' },
  { id: 'register', content: 'Register', to: '/register' },
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

const SignIn: React.FunctionComponent<Props> = (props: Props) => {
  const [currentStep, setCurrentStep] = React.useState<Step>('signIn')
  const [signInCredentials, setSignInCredentials] = React.useState<
    SignInCredentials
  >({ email: '', password: '' })
  const client = useApolloClient()

  const getNextStep = React.useCallback<GetNextStep>(
    ({ isTwoFactorAuthEnabled }) =>
      currentStep === 'signIn' && isTwoFactorAuthEnabled
        ? 'signInTwoFactorAuth'
        : 'redirect',
    [currentStep]
  )

  React.useEffect(() => {
    if (currentStep === 'redirect') {
      client
        .query<CurrentUserQueryData>({
          fetchPolicy: 'network-only',
          query: currentUserQuery,
        })
        .then(({ data }) => data.user && navigate('/', { replace: true }))
        .catch(error => __DEV__ && console.error(error))
    }
  }, [client, currentStep])

  if (currentStep === 'signInTwoFactorAuth') {
    return (
      <Root data-testid="sign-in" {...props}>
        <Content>
          <SignInTwoFactorAuthForm
            onCompleted={user => setCurrentStep(getNextStep(user))}
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
          onCompleted={user => setCurrentStep(getNextStep(user))}
          setSignInCredentials={setSignInCredentials}
        />
      </Content>
    </Root>
  )
}

export default SignIn
