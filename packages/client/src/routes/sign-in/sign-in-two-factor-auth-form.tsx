import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Omit, User } from '@fintruth-sdk/common'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help } from 'styles/mixins'
import {
  SignInTwoFactorAuthMutationData,
  SignInTwoFactorAuthMutationVariables,
  signInTwoFactorAuthMutation,
} from './graphql'

interface Props
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  > {
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

const initialValues: Values = { token: '' }

const formId = 'sign-in-two-factor-auth__Form'

const Help = styled.p`
  ${({ theme }) => help(theme.danger)};
  margin: ${rem(-10)} 0 ${rem(30)};
`

const LastField = styled(Field)`
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
  const client = useApolloClient()

  const [onSubmit, { loading }] = useMutation<
    SignInTwoFactorAuthMutationData,
    SignInTwoFactorAuthMutationVariables
  >(signInTwoFactorAuthMutation, {
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
          onSubmit({ variables: { ...signInCredentials, ...variables } })
        }
      >
        <Form {...props} id={formId} noValidate>
          <LastField name="token">
            <FieldLabel>VERIFICATION CODE</FieldLabel>
            <FieldInput form={formId} />
            <FieldHelp />
          </LastField>
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
  )
}

export default SignInTwoFactorAuthForm
