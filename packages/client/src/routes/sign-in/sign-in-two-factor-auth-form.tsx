import React from 'react'
import styled, { NoticeVariant } from 'styled-components' // eslint-disable-line import/named
import { ApolloConsumer, Mutation } from 'react-apollo'
import { Form as BaseForm, Formik } from 'formik'
import { User } from '@fintruth-sdk/shared'
import { object, string } from 'yup'

import BaseButton from 'components/button'
import BaseNotice from 'components/notice'
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

const formId = 'sign-in-two-factor-auth__Form'

const SignInTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  resolveNextView,
  signInCredentials,
  ...rest
}: Props) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [variant, setVariant] = React.useState<NoticeVariant>('success')

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
              setVariant('danger')
            } else if (response.user) {
              resolveNextView(response.user)
            }
          }}
        >
          {(onSubmit, { loading }) => (
            <React.Fragment>
              {notice && <Notice variant={variant}>{notice}</Notice>}
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
