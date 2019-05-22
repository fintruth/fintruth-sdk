import { User } from '@fintruth-sdk/shared'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { ApolloContext, Mutation } from 'react-apollo'
import styled from 'styled-components'
import { object, string } from 'yup'

import BaseButton from 'components/button'
import Input from 'components/input'
import { help } from 'styles/mixins'
import {
  SignInTwoFactorAuthFormMutationData,
  SignInTwoFactorAuthFormMutationVariables,
  signInTwoFactorAuthFormMutation,
} from './graphql'

interface Props {
  onCompleted: (user: User) => void
  signInCredentials?: SignInCredentials
}

export interface SignInCredentials {
  email: string
  password: string
}

interface Values {
  token: string
}

const initialValues = { token: '' }

const validationSchema = object().shape({
  token: string().required('This is a required field'),
})

const formId = 'sign-in-two-factor-auth__Form'

const Help = styled.p`
  ${({ theme }) => help(theme.danger)};
  margin: ${rem(-10)} 0 ${rem(30)};
`

const LastInput = styled(Input)`
  &:not(:last-child) {
    margin-bottom: ${rem(40)};
  }
`

const Button = styled(BaseButton)`
  display: block;
  margin: 0 auto;
`

const SignInTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  onCompleted,
  signInCredentials = { email: '', password: '' },
  ...props
}: Props) => {
  const [helpContent, setHelpContent] = React.useState<string>()
  const { client } = React.useContext(ApolloContext as any)

  return (
    <Mutation<
      SignInTwoFactorAuthFormMutationData,
      SignInTwoFactorAuthFormMutationVariables
    >
      mutation={signInTwoFactorAuthFormMutation}
      onCompleted={({ response }) => {
        // NOTE: Due to the inability to invalidate Apollo's cache the
        // entire store needs to be reset in order to prevent storing
        // private data
        client.resetStore()

        if (response.error) {
          setHelpContent(response.error.message)
        } else if (response.user) {
          onCompleted(response.user)
        }
      }}
    >
      {(onSubmit, { loading }) => (
        <React.Fragment>
          {helpContent && <Help>{helpContent}</Help>}
          <Formik<Values>
            initialValues={initialValues}
            onSubmit={variables =>
              onSubmit({
                variables: { ...signInCredentials, ...variables },
              })
            }
            validationSchema={validationSchema}
          >
            <Form {...props} id={formId} noValidate>
              <LastInput
                id={`${formId}-token`}
                autoComplete="off"
                form={formId}
                label="VERIFICATION CODE"
                name="token"
                type="text"
              />
              <Button
                form={formId}
                isLoading={loading}
                type="submit"
                variant="primary"
              >
                CONTINUE
              </Button>
            </Form>
          </Formik>
        </React.Fragment>
      )}
    </Mutation>
  )
}

export default SignInTwoFactorAuthForm
