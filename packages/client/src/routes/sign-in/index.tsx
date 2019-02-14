import React from 'react'
import styled from 'styled-components'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { Form as BaseForm, Formik } from 'formik'
import { Link as BaseLink, Redirect, RouteComponentProps } from '@reach/router'
import { User } from '@fintruth-sdk/shared'
import { object, string } from 'yup'
import { rem } from 'polished'

import BaseButton from 'components/button'
import BaseNotice from 'components/notice'
import BaseSubnavbar from 'components/subnavbar'
import ControlledInputField from 'components/controlled-input-field'
import { centered, link } from 'styles/mixins'
import { renderLoadingIf } from 'utilities/loading'
import {
  SignInViewMutationData,
  SignInViewMutationVariables,
  TwoFactorAuthViewMutationData,
  TwoFactorAuthViewMutationVariables,
  signInViewMutation,
  twoFactorAuthViewMutation,
} from './graphql'

interface Credentials {
  email: string
  password: string
}

interface SignInFormValues {
  email: string
  password: string
}

interface SignInViewProps {
  resolveNextView: (user: User) => void
  setCredentials: (credentials: Credentials) => void
}

interface TwoFactorAuthFormValues {
  token: string
}

interface TwoFactorAuthViewProps {
  credentials: Credentials
  resolveNextView: (user: User) => void
}

const FINAL_VIEW = 'FINAL_VIEW'
const SIGN_IN_VIEW = 'SIGN_IN_VIEW'
const TWO_FACTOR_AUTH_VIEW = 'TWO_FACTOR_AUTH_VIEW'

const Root = styled.div`
  ${centered};
  flex-direction: column;
  min-height: 100vh;
`

const Subnavbar = styled(BaseSubnavbar)`
  margin-bottom: ${rem(50)};
  width: ${rem(280)};
`

const Notice = styled(BaseNotice)`
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  display: flex;
  flex-direction: column;
  width: ${rem(280)};
`

const Link = styled(BaseLink)`
  ${link};
  margin-top: ${rem(16)};
`

const Button = styled(BaseButton)`
  align-self: center;
  margin-top: ${rem(40)};
`

const getNextView = (currentView: string, { isTwoFactorAuthEnabled }: User) => {
  if (currentView === SIGN_IN_VIEW && isTwoFactorAuthEnabled) {
    return TWO_FACTOR_AUTH_VIEW
  }

  return FINAL_VIEW
}

const initialSignInFormValues = { email: '', password: '' }

const initialTwoFactorAuthFormValues = { token: '' }

const items = [
  { id: 'sign-in', content: 'SIGN IN', to: '/sign-in' },
  { id: 'register', content: 'REGISTER', to: '/register' },
]

const signInFormValidationSchema = object().shape({
  email: string()
    .required('This is a required field')
    .email('Please provide a valid email address'),
  password: string().required('This is a required field'),
})

const twoFactorAuthFormValidationSchema = object().shape({
  token: string().required('This is a required field'),
})

const signInFormId = 'sign-in__Form'
const twoFactorAuthFormId = 'two-factor-auth__Form'

const SignInView: React.FunctionComponent<SignInViewProps> = ({
  resolveNextView,
  setCredentials,
  ...rest
}: SignInViewProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Root {...rest}>
      <ApolloConsumer>
        {client => (
          <Mutation<SignInViewMutationData, SignInViewMutationVariables>
            mutation={signInViewMutation}
            onCompleted={({ response }) => {
              client.resetStore()

              if (response.error) {
                setNotice(response.error.message)
                setStatus('failure')
              } else if (response.user) {
                resolveNextView(response.user)
              }
            }}
          >
            {(onSubmit, { loading }) =>
              renderLoadingIf(loading, () => (
                <React.Fragment>
                  <Subnavbar items={items} />
                  {notice && <Notice status={status}>{notice}</Notice>}
                  <Formik<SignInFormValues>
                    initialValues={initialSignInFormValues}
                    onSubmit={variables => {
                      setCredentials(variables)

                      return onSubmit({ variables })
                    }}
                    validationSchema={signInFormValidationSchema}
                  >
                    {() => (
                      <Form id={signInFormId} noValidate>
                        <ControlledInputField
                          id={`${signInFormId}-email`}
                          autoComplete="off"
                          form={signInFormId}
                          label="EMAIL"
                          name="email"
                          type="email"
                        />
                        <ControlledInputField
                          id={`${signInFormId}-password`}
                          autoComplete="off"
                          form={signInFormId}
                          label="PASSWORD"
                          name="password"
                          type="password"
                        />
                        <Link to="/recover">Forgot your password?</Link>
                        <Button
                          form={signInFormId}
                          status="primary"
                          type="submit"
                        >
                          SIGN IN
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </React.Fragment>
              ))
            }
          </Mutation>
        )}
      </ApolloConsumer>
    </Root>
  )
}

const TwoFactorAuthView: React.FunctionComponent<TwoFactorAuthViewProps> = ({
  credentials,
  resolveNextView,
  ...rest
}: TwoFactorAuthViewProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Root {...rest}>
      <ApolloConsumer>
        {client => (
          <Mutation<
            TwoFactorAuthViewMutationData,
            TwoFactorAuthViewMutationVariables
          >
            mutation={twoFactorAuthViewMutation}
            onCompleted={({ response }) => {
              client.resetStore()

              if (response.error) {
                setNotice(response.error.message)
                setStatus('failure')
              } else if (response.user) {
                resolveNextView(response.user)
              }
            }}
          >
            {(onSubmit, { loading }) =>
              renderLoadingIf(loading, () => (
                <React.Fragment>
                  {notice && <Notice status={status}>{notice}</Notice>}
                  <Formik<TwoFactorAuthFormValues>
                    initialValues={initialTwoFactorAuthFormValues}
                    onSubmit={variables =>
                      onSubmit({ variables: { ...credentials, ...variables } })
                    }
                    validationSchema={twoFactorAuthFormValidationSchema}
                  >
                    {() => (
                      <Form id={twoFactorAuthFormId} noValidate>
                        <ControlledInputField
                          id={`${twoFactorAuthFormId}-token`}
                          autoComplete="off"
                          form={twoFactorAuthFormId}
                          label="VERIFICATION CODE"
                          name="token"
                          type="text"
                        />
                        <Button
                          form={twoFactorAuthFormId}
                          status="primary"
                          type="submit"
                        >
                          CONTINUE
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </React.Fragment>
              ))
            }
          </Mutation>
        )}
      </ApolloConsumer>
    </Root>
  )
}

const SignIn: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => {
  const [currentView, setCurrentView] = React.useState(SIGN_IN_VIEW)
  const [credentials, setCredentials] = React.useState<Credentials>({
    email: '',
    password: '',
  })

  if (currentView === TWO_FACTOR_AUTH_VIEW) {
    return (
      <TwoFactorAuthView
        {...rest}
        credentials={credentials}
        resolveNextView={(user: User) =>
          setCurrentView(getNextView(currentView, user))
        }
      />
    )
  } else if (currentView === FINAL_VIEW) {
    return <Redirect from="/sign-in" noThrow to="/" />
  }

  return (
    <SignInView
      {...rest}
      resolveNextView={(user: User) =>
        setCurrentView(getNextView(currentView, user))
      }
      setCredentials={setCredentials}
    />
  )
}

export default SignIn
