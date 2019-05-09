import { Link as BaseLink } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { ApolloConsumer, Mutation } from 'react-apollo'
import styled, { NoticeVariant } from 'styled-components' // eslint-disable-line import/named
import { object, ref, string } from 'yup'

import BaseButton from 'components/button'
import BaseInput from 'components/input'
import BaseNotice from 'components/notice'
import { link } from 'styles/deprecated'
import {
  UpdatePasswordMutationData,
  UpdatePasswordMutationVariables,
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

const Input = styled(BaseInput)`
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

const UpdatePasswordForm: React.FunctionComponent = ({ ...props }) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [variant, setVariant] = React.useState<NoticeVariant>('success')

  return (
    <ApolloConsumer>
      {client => (
        <Mutation<UpdatePasswordMutationData, UpdatePasswordMutationVariables>
          mutation={updatePasswordMutation}
          onCompleted={({ response }) => {
            // NOTE: Due to the inability to invalidate Apollo's cache the
            // entire store needs to be reset in order to prevent storing
            // private data
            client.resetStore()

            if (response.error) {
              setNotice(response.error.message)
              setVariant('danger')
            } else {
              setNotice('Your password was successfully updated')
              setVariant('success')
            }
          }}
        >
          {(onSubmit, { loading }) => (
            <Formik<Values>
              initialValues={initialValues}
              onSubmit={(variables, { resetForm }) =>
                onSubmit({ variables }).then(value =>
                  path(['data', 'response', 'error'], value)
                    ? undefined
                    : resetForm(initialValues)
                )
              }
              validationSchema={validationSchema}
            >
              <React.Fragment>
                {notice && <Notice variant={variant}>{notice}</Notice>}
                <Form {...props} id={formId} noValidate>
                  <Input
                    id={`${formId}-password`}
                    autoComplete="off"
                    form={formId}
                    name="password"
                    placeholder="Current Password"
                    type="password"
                  />
                  <Input
                    id={`${formId}-newPassword`}
                    autoComplete="off"
                    form={formId}
                    name="newPassword"
                    placeholder="New Password"
                    type="password"
                  />
                  <Input
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
            </Formik>
          )}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default UpdatePasswordForm
