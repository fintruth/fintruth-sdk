import React from 'react'
import styled from 'styled-components'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { ApolloQueryResult } from 'apollo-client' // eslint-disable-line import/named
import { Form as BaseForm, Formik } from 'formik'
import { User } from '@fintruth-sdk/shared'
import { object, string } from 'yup'

import BaseButton from 'components/button'
import BaseControlledInputField from 'components/controlled-input-field'
import BaseNotice from 'components/notice'
import {
  AccountQueryData,
  UpdateEmailMutationData,
  UpdateEmailMutationVariables,
  updateEmailMutation,
} from './graphql'
import { button, field, form, notice } from './mixins'

interface Props {
  refetchAccountQuery: () => Promise<ApolloQueryResult<AccountQueryData>>
  user?: User
}

interface Values {
  newEmail: string
  password: string
}

const Notice = styled(BaseNotice)`
  ${notice}
`

const Form = styled(BaseForm)`
  ${form}
`

const ControlledInputField = styled(BaseControlledInputField)`
  ${field}
`

const Button = styled(BaseButton)`
  ${button}
`

const validationSchema = object().shape({
  newEmail: string()
    .required('This is a required field')
    .email('Please provide a valid email address'),
  password: string().required('This is a required field'),
})

const formId = 'update-email__Form'

const UpdateEmailForm: React.FunctionComponent<Props> = ({
  refetchAccountQuery,
  user,
  ...rest
}: Props) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <ApolloConsumer>
      {client => (
        <Mutation<UpdateEmailMutationData, UpdateEmailMutationVariables>
          mutation={updateEmailMutation}
          onCompleted={({ response }) => {
            client.resetStore().then(() => refetchAccountQuery()) // eslint-disable-line promise/catch-or-return

            if (response.error) {
              setNotice(response.error.message)
              setStatus('failure')
            } else if (response.user) {
              setNotice('Your email address was successfully updated')
              setStatus('success')
            }
          }}
        >
          {onSubmit => (
            <Formik<Values>
              initialValues={{
                newEmail: user ? user.email : '',
                password: '',
              }}
              onSubmit={variables => onSubmit({ variables })}
              validationSchema={validationSchema}
            >
              {() => (
                <React.Fragment>
                  {notice && <Notice status={status}>{notice}</Notice>}
                  <Form {...rest} id={formId} noValidate>
                    <ControlledInputField
                      id={`${formId}-newEmail`}
                      autoComplete="off"
                      form={formId}
                      name="newEmail"
                      placeholder="Email"
                      type="email"
                    />
                    <ControlledInputField
                      id={`${formId}-password`}
                      autoComplete="off"
                      form={formId}
                      name="password"
                      placeholder="Password"
                      type="password"
                    />
                    <Button form={formId} status="primary" type="submit">
                      UPDATE
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

export default UpdateEmailForm
