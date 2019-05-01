import React from 'react'
import styled, { NoticeVariant } from 'styled-components' // eslint-disable-line import/named
import { ApolloConsumer, Mutation } from 'react-apollo'
import { Form as BaseForm, Formik } from 'formik'
import { User } from '@fintruth-sdk/shared'
import { object, string } from 'yup'
import { path } from 'ramda'

import BaseButton from 'components/button'
import BaseControlledInputField from 'components/controlled-input-field'
import BaseNotice from 'components/notice'
import {
  UpdateEmailMutationData,
  UpdateEmailMutationVariables,
  updateEmailMutation,
} from './graphql'
import { button, field, form, notice } from './mixins'

interface Props {
  user: User
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
  user,
  ...props
}: Props) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [variant, setVariant] = React.useState<NoticeVariant>('success')

  return (
    <ApolloConsumer>
      {client => (
        <Mutation<UpdateEmailMutationData, UpdateEmailMutationVariables>
          mutation={updateEmailMutation}
          onCompleted={({ response }) => {
            // NOTE: Due to the inability to invalidate Apollo's cache the
            // entire store needs to be reset in order to prevent storing
            // private data
            client.resetStore()

            if (response.error) {
              setNotice(response.error.message)
              setVariant('danger')
            } else if (response.user) {
              setNotice('Your email address was successfully updated')
              setVariant('success')
            }
          }}
        >
          {(onSubmit, { loading }) => (
            <Formik<Values>
              initialValues={{ newEmail: user.email, password: '' }}
              onSubmit={(variables, { resetForm }) =>
                onSubmit({ variables }).then(value =>
                  path(['data', 'response', 'error'], value)
                    ? undefined
                    : resetForm({ ...variables, password: '' })
                )
              }
              validationSchema={validationSchema}
            >
              <React.Fragment>
                {notice && <Notice variant={variant}>{notice}</Notice>}
                <Form {...props} id={formId} noValidate>
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

export default UpdateEmailForm
