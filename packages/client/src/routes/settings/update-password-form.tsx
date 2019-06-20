import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Omit } from '@fintruth-sdk/common'
import { object, ref, string } from '@fintruth-sdk/validation'
import { Link as BaseLink } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import BaseField, { FieldHelp, FieldInput } from 'components/field'
import { link } from 'styles/deprecated'
import { help } from 'styles/mixins'
import {
  UpdatePasswordMutationData,
  UpdatePasswordMutationVariables,
  updatePasswordMutation,
} from './graphql'
import { button, field, form } from './mixins'

type Props = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onReset' | 'onSubmit'
>

interface HelpProps {
  color: Color
}

interface Values {
  newPassword: string
  newPasswordConfirm: string
  password: string
}

const initialValues: Values = {
  newPassword: '',
  newPasswordConfirm: '',
  password: '',
}

const validationSchema = object().shape({
  newPassword: string().notOneOf(
    [ref('password')],
    'Enter a password different than the current password'
  ),
  newPasswordConfirm: string().oneOf(
    [ref('newPassword')],
    'Retype the new password'
  ),
})

const formId = 'update-password__Form'

const Help = styled.p<HelpProps>`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
`

const Field = styled(BaseField)`
  ${field};
`

const Link = styled(BaseLink)`
  ${link};
  margin-top: ${rem(16)};
`

const Button = styled(BaseButton)`
  ${button};
`

const UpdatePasswordForm: React.FunctionComponent<Props> = ({
  ...props
}: Props) => {
  const [helpColor, setHelpColor] = React.useState<Color>('success')
  const [helpContent, setHelpContent] = React.useState<string>()
  const client = useApolloClient()

  const [onSubmit, { loading }] = useMutation<
    UpdatePasswordMutationData,
    UpdatePasswordMutationVariables
  >(updatePasswordMutation, {
    onCompleted: ({ response }) => {
      // NOTE: Due to the inability to invalidate Apollo's cache the
      // entire store needs to be reset in order to prevent storing
      // private data
      client.resetStore()

      if (response.error) {
        setHelpColor('danger')
        setHelpContent(response.error.message)
      } else {
        setHelpColor('success')
        setHelpContent('Your password was successfully updated')
      }
    },
  })

  return (
    <React.Fragment>
      {helpContent && <Help color={helpColor}>{helpContent}</Help>}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={(variables, { resetForm }) =>
          onSubmit({ variables }).then(value =>
            path(['data', 'response', 'error'], value) ? undefined : resetForm()
          )
        }
        validationSchema={validationSchema}
      >
        <Form {...props} id={formId} noValidate>
          <Field name="password">
            <FieldInput
              form={formId}
              placeholder="Current Password"
              type="password"
            />
            <FieldHelp />
          </Field>
          <Field name="newPassword">
            <FieldInput
              form={formId}
              placeholder="New Password"
              type="password"
            />
            <FieldHelp />
          </Field>
          <Field name="newPasswordConfirm">
            <FieldInput
              form={formId}
              placeholder="Confirm New Password"
              type="password"
            />
            <FieldHelp />
          </Field>
          <Link to="/recover">Forgot your password?</Link>
          <Button
            form={formId}
            isLoading={loading}
            type="submit"
            variant="primary"
          >
            UPDATE
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default UpdatePasswordForm
