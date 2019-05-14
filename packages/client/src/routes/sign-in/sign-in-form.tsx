import { User } from '@fintruth-sdk/shared'
import { Link as BaseLink } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { ApolloConsumer, Mutation } from 'react-apollo'
import styled from 'styled-components'
import { object, string } from 'yup'

import BaseButton from 'components/button'
import Input from 'components/input'
import BaseSubnavbar from 'components/subnavbar'
import { link } from 'styles/deprecated'
import { help } from 'styles/mixins'
import {
  SignInMutationData,
  SignInMutationVariables,
  signInMutation,
} from './graphql'
import { button, form } from './mixins'
import { SignInCredentials } from './sign-in-two-factor-auth-form'

interface Props {
  resolveNextView: (user: User) => void
  setSignInCredentials: (signInCredentials: SignInCredentials) => void
}

interface Values {
  email: string
  password: string
}

const Subnavbar = styled(BaseSubnavbar)`
  margin-bottom: ${rem(50)};
  width: ${rem(280)};
`

const Help = styled.p`
  ${({ theme }) => help(theme.danger)};
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
`

const Link = styled(BaseLink)`
  ${link};
  margin-top: ${rem(16)};
`

const Button = styled(BaseButton)`
  ${button};
`

const initialValues = { email: '', password: '' }

const items = [
  { id: 'sign-in', content: 'SIGN IN', to: '/sign-in' },
  { id: 'register', content: 'REGISTER', to: '/register' },
]

const validationSchema = object().shape({
  email: string()
    .required('This is a required field')
    .email('Please provide a valid email address'),
  password: string().required('This is a required field'),
})

const formId = 'sign-in__Form'

const SignInForm: React.FunctionComponent<Props> = ({
  resolveNextView,
  setSignInCredentials,
  ...props
}: Props) => {
  const [helpContent, setHelpContent] = React.useState<string>()

  return (
    <ApolloConsumer>
      {client => (
        <Mutation<SignInMutationData, SignInMutationVariables>
          mutation={signInMutation}
          onCompleted={({ response }) => {
            // NOTE: Due to the inability to invalidate Apollo's cache the
            // entire store needs to be reset in order to prevent storing
            // private data
            client.resetStore()

            if (response.error) {
              setHelpContent(response.error.message)
            } else if (response.user) {
              resolveNextView(response.user)
            }
          }}
        >
          {(onSubmit, { loading }) => (
            <React.Fragment>
              <Subnavbar items={items} />
              {helpContent && <Help>{helpContent}</Help>}
              <Formik<Values>
                initialValues={initialValues}
                onSubmit={variables =>
                  onSubmit({ variables }).then(value =>
                    path(['data', 'response', 'error'], value)
                      ? undefined
                      : setSignInCredentials(variables)
                  )
                }
                validationSchema={validationSchema}
              >
                <Form {...props} id={formId} noValidate>
                  <Input
                    id={`${formId}-email`}
                    autoComplete="off"
                    form={formId}
                    label="EMAIL"
                    name="email"
                    type="email"
                  />
                  <Input
                    id={`${formId}-password`}
                    autoComplete="off"
                    form={formId}
                    label="PASSWORD"
                    name="password"
                    type="password"
                  />
                  <Link to="/recover">Forgot your password?</Link>
                  <Button
                    form={formId}
                    isLoading={loading}
                    type="submit"
                    variant="primary"
                  >
                    SIGN IN
                  </Button>
                </Form>
              </Formik>
            </React.Fragment>
          )}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default SignInForm
