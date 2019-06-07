import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Omit } from '@fintruth-sdk/common'
import { Link as BaseLink } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named
import { object, ref, string } from 'yup'

import BaseButton from 'components/button'
import BaseInput from 'components/input'
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

const Help = styled.p<HelpProps>`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
`

const Input = styled(BaseInput)`
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
