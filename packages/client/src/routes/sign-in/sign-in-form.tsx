import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Omit, User } from '@fintruth-sdk/shared'
import { Link as BaseLink } from '@reach/router'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { object, string } from 'yup'

import BaseButton from 'components/button'
import Input from 'components/input'
import { help, link } from 'styles/mixins'
import {
  SignInMutationData,
  SignInMutationVariables,
  signInMutation,
} from './graphql'
import { SignInCredentials } from './sign-in-two-factor-auth-form'

interface Props
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  > {
  onCompleted: (user: User) => void
  setSignInCredentials: (signInCredentials: SignInCredentials) => void
}

interface Values {
  email: string
  password: string
}

const initialValues: Values = { email: '', password: '' }

const validationSchema = object().shape({
  email: string()
    .required('This is a required field')
    .email('Please provide a valid email address'),
  password: string().required('This is a required field'),
})

const formId = 'sign-in__Form'

const Help = styled.p`
  ${({ theme }) => help(theme.danger)};
  margin: ${rem(-10)} 0 ${rem(30)};
`

const Link = styled(BaseLink)`
  ${link};
  display: block;
  font-size: ${rem(12)};
  margin-bottom: ${rem(40)};
`

const Button = styled(BaseButton)`
  display: block;
  margin: 0 auto;
`

const SignInForm: React.FunctionComponent<Props> = ({
  onCompleted,
  setSignInCredentials,
  ...props
}: Props) => {
  const [helpContent, setHelpContent] = React.useState<string>()
  const client = useApolloClient()

  const [onSubmit, { loading }] = useMutation<
    SignInMutationData,
    SignInMutationVariables
  >(signInMutation, {
    onCompleted: ({ response }) => {
      // NOTE: Due to the inability to invalidate Apollo's cache the
      // entire store needs to be reset in order to prevent storing
      // private data
      client.resetStore()

      if (response.error) {
        setHelpContent(response.error.message)
      } else if (response.user) {
        onCompleted(response.user)
      }
    },
  })

  return (
    <React.Fragment>
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
  )
}

export default SignInForm
