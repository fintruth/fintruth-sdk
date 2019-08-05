import { useMutation } from '@apollo/react-hooks'
import { object, ref, string } from '@fintruth-sdk/validation'
import { Link as BaseLink } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import BaseField, { FieldHelp, FieldInput } from 'components/field'
import { help, link } from 'styles/mixins'
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

const name = 'update-password-form'

const Help = styled.p.attrs((props: HelpProps) => ({
  color: 'success',
  ...props,
}))`
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
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()

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
    <React.Fragment>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={(variables, { resetForm }) =>
          onSubmit({ variables }).then(value =>
            path(['data', 'response', 'error'], value) ? undefined : resetForm()
          )
        }
        validationSchema={validationSchema}
      >
        <Form {...props} id={seed(name)} noValidate>
          <Field name="password">
            <FieldInput
              form={seed(name)}
              placeholder="Current Password"
              type="password"
            />
            <FieldHelp />
          </Field>
          <Field name="newPassword">
            <FieldInput
              form={seed(name)}
              placeholder="New Password"
              type="password"
            />
            <FieldHelp />
          </Field>
          <Field name="newPasswordConfirm">
            <FieldInput
              form={seed(name)}
              placeholder="Confirm New Password"
              type="password"
            />
            <FieldHelp />
          </Field>
          <Link to="/recover">Forgot your password?</Link>
          <Button
            form={seed(name)}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            Update
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default UpdatePasswordForm
