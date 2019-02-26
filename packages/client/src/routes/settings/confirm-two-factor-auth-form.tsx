import React from 'react'
import styled from 'styled-components'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { Form as BaseForm, Formik } from 'formik'
import { object, string } from 'yup'
import { rem } from 'polished'

import BaseButton from 'components/button'
import BaseControlledInputField from 'components/controlled-input-field'
import BaseNotice, { Status } from 'components/notice'
import {
  ConfirmTwoFactorAuthMutationData,
  ConfirmTwoFactorAuthMutationVariables,
  accountQuery,
  confirmTwoFactorAuthMutation,
} from './graphql'
import { button, field, form, notice } from './mixins'

interface Props {
  onCompleted?: () => void
}

interface Values {
  token: string
}

const Notice = styled(BaseNotice)`
  ${notice}
  margin: 0 0 ${rem(30)};
`

const Form = styled(BaseForm)`
  ${form};
  align-items: center;
`

const ControlledInputField = styled(BaseControlledInputField)`
  ${field};
`

const Button = styled(BaseButton)`
  ${button};
  align-self: unset;
`

const initialValues = { token: '' }

const validationSchema = object().shape({
  token: string().required('This is a required field'),
})

const formId = 'confirm-two-factor-auth__Form'

const ConfirmTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  onCompleted,
  ...rest
}: Props) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState<Status>('success')

  return (
    <ApolloConsumer>
      {client => (
        <Mutation<
          ConfirmTwoFactorAuthMutationData,
          ConfirmTwoFactorAuthMutationVariables
        >
          mutation={confirmTwoFactorAuthMutation}
          onCompleted={({ response }) => {
            client // eslint-disable-line promise/catch-or-return
              .resetStore()
              .then(() => client.query({ query: accountQuery }))

            if (response.error) {
              setNotice(response.error.message)
              setStatus('failure')
            } else if (onCompleted) {
              onCompleted()
            }
          }}
        >
          {(onSubmit, { loading }) => (
            <Formik<Values>
              initialValues={initialValues}
              onSubmit={variables => onSubmit({ variables })}
              validationSchema={validationSchema}
            >
              {() => (
                <React.Fragment>
                  {notice && <Notice status={status}>{notice}</Notice>}
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
                      ENABLE
                    </Button>
                  </Form>
                </React.Fragment>
              )}
            </Formik>
          )}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default ConfirmTwoFactorAuthForm
