import React from 'react'
import styled from 'styled-components'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { Form as BaseForm, Formik } from 'formik'
import { Link as BaseLink } from '@reach/router'
import { object, ref, string } from 'yup'
import { rem } from 'polished'

import BaseButton from 'components/button'
import BaseControlledInputField from 'components/controlled-input-field'
import BaseNotice, { Status } from 'components/notice'
import { link } from 'styles/mixins'
import {
  UpdatePasswordMutationData,
  UpdatePasswordMutationVariables,
  accountQuery,
  updatePasswordMutation,
} from './graphql'
import { button, field, form, notice } from './mixins'

interface Values {
  newPassword: string
  newPasswordConfirm: string
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

const Link = styled(BaseLink)`
  ${link};
  margin-top: ${rem(16)};
`

const Button = styled(BaseButton)`
  ${button}
`

const initialValues = { newPassword: '', newPasswordConfirm: '', password: '' }

const validationSchema = object().shape({
  password: string().required('This is a required field'),
  newPassword: string()
    .required('This is a required field')
    .notOneOf(
      [ref('password')],
      'Please enter a password different than the current password'
    )
    .min(10, 'Minimum length is ${min} characters'), // eslint-disable-line no-template-curly-in-string
  newPasswordConfirm: string()
    .required('This is a required field')
    .oneOf([ref('newPassword')], 'Please retype the new password'),
})

const formId = 'update-password__Form'

const UpdatePasswordForm: React.FunctionComponent = ({ ...rest }) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState<Status>('success')

  return (
    <ApolloConsumer>
      {client => (
        <Mutation<UpdatePasswordMutationData, UpdatePasswordMutationVariables>
          mutation={updatePasswordMutation}
          onCompleted={({ response }) => {
            client // eslint-disable-line promise/catch-or-return
              .resetStore()
              .then(() => client.query({ query: accountQuery }))

            if (response.error) {
              setNotice(response.error.message)
              setStatus('failure')
            } else {
              setNotice('Your password was successfully updated')
              setStatus('success')
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
                      id={`${formId}-password`}
                      autoComplete="off"
                      form={formId}
                      name="password"
                      placeholder="Current Password"
                      type="password"
                    />
                    <ControlledInputField
                      id={`${formId}-newPassword`}
                      autoComplete="off"
                      form={formId}
                      name="newPassword"
                      placeholder="New Password"
                      type="password"
                    />
                    <ControlledInputField
                      id={`${formId}-newPasswordConfirm`}
                      autoComplete="off"
                      form={formId}
                      name="newPasswordConfirm"
                      placeholder="Confirm New Password"
                      type="password"
                    />
                    <Link to="/recover">Forgot your password?</Link>
                    <Button
                      form={formId}
                      isLoading={loading}
                      status="primary"
                      type="submit"
                    >
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

export default UpdatePasswordForm
