import React from 'react'
import styled from 'styled-components'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { Form as BaseForm, Formik } from 'formik'
import { User } from '@fintruth-sdk/shared'
import { object, string } from 'yup'

import BaseButton from 'components/button'
import BaseNotice, { Status } from 'components/notice'
import ControlledInputField from 'components/controlled-input-field'
import {
  SignInTwoFactorAuthMutationData,
  SignInTwoFactorAuthMutationVariables,
  signInTwoFactorAuthMutation,
} from './graphql'
import { button, form, notice } from './mixins'

interface Props {
  resolveNextView: (user: User) => void
  signInCredentials: SignInCredentials
}

export interface SignInCredentials {
  email: string
  password: string
}

interface Values {
  token: string
}

const Notice = styled(BaseNotice)`
  ${notice}
`

const Form = styled(BaseForm)`
  ${form}
`

const Button = styled(BaseButton)`
  ${button}
`

const initialValues = { token: '' }

const validationSchema = object().shape({
  token: string().required('This is a required field'),
})

const formId = 'two-factor-auth__Form'

const SignInTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  resolveNextView,
  signInCredentials,
  ...rest
}: Props) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState<Status>('success')

  return (
    <ApolloConsumer>
      {client => (
        <Mutation<
          SignInTwoFactorAuthMutationData,
          SignInTwoFactorAuthMutationVariables
        >
          mutation={signInTwoFactorAuthMutation}
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
          {(onSubmit, { loading }) => (
            <React.Fragment>
              {notice && <Notice status={status}>{notice}</Notice>}
              <Formik<Values>
                initialValues={initialValues}
                onSubmit={variables =>
                  onSubmit({
                    variables: { ...signInCredentials, ...variables },
                  })
                }
                validationSchema={validationSchema}
              >
                {() => (
                  <Form {...rest} id={formId} noValidate>
                    <ControlledInputField
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
                      status="primary"
                      type="submit"
                    >
                      CONTINUE
                    </Button>
                  </Form>
                )}
              </Formik>
            </React.Fragment>
          )}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default SignInTwoFactorAuthForm
