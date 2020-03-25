import { useMutation } from '@apollo/react-hooks'
import { object, ref, string } from '@fintruth-sdk/validation'
import { Link as BaseLink } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components'

import BaseButton from 'components/button'
import BaseField, { FieldHelp, FieldInput } from 'components/field'
import { help, link } from 'styles/mixins'
import { hasResponseError } from 'utils/apollo'
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

interface HelpProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color
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

const Help = styled.p.attrs((attrs) => ({ color: 'success', ...attrs }))<
  HelpProps
>`
  ${({ color, theme }) => help(theme[color])};
  margin-bottom: ${rem(30)};
  width: ${rem(280)};

  &:not(:first-child) {
    margin-top: ${rem(-10)};
  }
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
  id,
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()
  const formId = id || seed('update-password-form')

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    UpdatePasswordMutationData,
    UpdatePasswordMutationVariables
  >(updatePasswordMutation, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ response }) =>
      setHelpProps(
        response.error
          ? { children: response.error.message, color: 'danger' }
          : { children: 'Your password was successfully updated' }
      ),
  })

  return (
    <>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={(variables, { resetForm }) =>
          onSubmit({ variables }).then(({ data }) =>
            hasResponseError(data) ? undefined : resetForm()
          )
        }
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
      >
        <Form id={formId} noValidate {...props}>
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
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            Update
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default UpdatePasswordForm
