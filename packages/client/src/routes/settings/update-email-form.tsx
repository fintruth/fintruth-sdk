import { User } from '@fintruth-sdk/shared'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { ApolloConsumer, Mutation } from 'react-apollo'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named
import { object, string } from 'yup'

import BaseButton from 'components/button'
import BaseInput from 'components/input'
import { help } from 'styles/mixins'
import {
  UpdateEmailMutationData,
  UpdateEmailMutationVariables,
  updateEmailMutation,
} from './graphql'
import { button, field, form } from './mixins'

interface HelpProps {
  color: Color
}

interface Props {
  user: User
}

interface Values {
  newEmail: string
  password: string
}

const Help = styled.p<HelpProps>`
  ${({ color }) => help(color)};
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
`

const Input = styled(BaseInput)`
  ${field};
`

const Button = styled(BaseButton)`
  ${button};
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
  const [helpColor, setHelpColor] = React.useState<Color>('success')
  const [helpContent, setHelpContent] = React.useState<string>()

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
              setHelpColor('danger')
              setHelpContent(response.error.message)
            } else if (response.user) {
              setHelpColor('success')
              setHelpContent('Your email address was successfully updated')
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
                {helpContent && <Help color={helpColor}>{helpContent}</Help>}
                <Form {...props} id={formId} noValidate>
                  <Input
                    id={`${formId}-newEmail`}
                    autoComplete="off"
                    form={formId}
                    name="newEmail"
                    placeholder="Email"
                    type="email"
                  />
                  <Input
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
                    type="submit"
                    variant="primary"
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
