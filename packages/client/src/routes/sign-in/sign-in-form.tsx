import React from 'react'
import styled, { NoticeVariant } from 'styled-components' // eslint-disable-line import/named
import { ApolloConsumer, Mutation } from 'react-apollo'
import { Form as BaseForm, Formik } from 'formik'
import { Link as BaseLink } from '@reach/router'
import { User } from '@fintruth-sdk/shared'
import { object, string } from 'yup'
import { path } from 'ramda'
import { rem } from 'polished'

import BaseButton from 'components/button'
import BaseNotice from 'components/notice'
import BaseSubnavbar from 'components/subnavbar'
import Input from 'components/input'
import { link } from 'styles/mixins'
import { SignInCredentials } from './sign-in-two-factor-auth-form'
import {
  SignInMutationData,
  SignInMutationVariables,
  signInMutation,
} from './graphql'
import { button, form, notice } from './mixins'

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

const Notice = styled(BaseNotice)`
  ${notice}
`

const Form = styled(BaseForm)`
  ${form}
`

const Link = styled(BaseLink)`
  ${link};
  margin-top: ${rem(16)};
`

const Button = styled(BaseButton)`
  ${button}
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
  const [notice, setNotice] = React.useState<null | string>(null)
  const [variant, setVariant] = React.useState<NoticeVariant>('success')

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
              setNotice(response.error.message)
              setVariant('danger')
            } else if (response.user) {
              resolveNextView(response.user)
            }
          }}
        >
          {(onSubmit, { loading }) => (
            <React.Fragment>
              <Subnavbar items={items} />
              {notice && <Notice variant={variant}>{notice}</Notice>}
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
                    status="primary"
                    type="submit"
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
