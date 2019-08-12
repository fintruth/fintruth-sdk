import { useMutation } from '@apollo/react-hooks'
import { object, ref, string } from '@fintruth-sdk/validation'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help } from 'styles/mixins'
import {
  RegisterMutationData,
  RegisterMutationVariables,
  registerMutation,
} from './graphql'

type Props = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onReset' | 'onSubmit'
>

interface HelpProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color
}

interface ProfileValues {
  familyName: string
  givenName: string
}

interface Values {
  email: string
  emailConfirm: string
  password: string
  profile: ProfileValues
}

const initialValues: Values = {
  email: '',
  emailConfirm: '',
  password: '',
  profile: { familyName: '', givenName: '' },
}

const validationSchema = object().shape({
  emailConfirm: string().oneOf([ref('email')], 'Retype the email address'),
})

const name = 'register-form'

const Help = styled.p.attrs((props: HelpProps) => ({
  color: 'success',
  ...props,
}))`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
`

const LastField = styled(Field)`
  &:not(:last-child) {
    margin-bottom: ${rem(40)};
  }
`

const Button = styled(BaseButton)`
  display: block;
  margin: 0 auto;
`

const RegisterForm: React.FunctionComponent<Props> = (props: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    RegisterMutationData,
    RegisterMutationVariables
  >(registerMutation, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ response }) => {
      setHelpProps(
        response.error
          ? { children: response.error.message, color: 'danger' }
          : { children: 'A verification email has been sent' }
      )
    },
  })

  return (
    <React.Fragment>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={({ emailConfirm: _, ...input }, { resetForm }) =>
          onSubmit({ variables: { input } }).then(value =>
            path(['data', 'response', 'error'], value) ? undefined : resetForm()
          )
        }
        validationSchema={validationSchema}
      >
        <Form {...props} id={seed(name)} noValidate>
          <Field name="profile.givenName">
            <FieldLabel>First Name</FieldLabel>
            <FieldInput autoComplete="given-name" form={seed(name)} />
            <FieldHelp />
          </Field>
          <Field name="profile.familyName">
            <FieldLabel>Last Name</FieldLabel>
            <FieldInput autoComplete="family-name" form={seed(name)} />
            <FieldHelp />
          </Field>
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <FieldInput form={seed(name)} type="email" />
            <FieldHelp />
          </Field>
          <Field name="emailConfirm">
            <FieldLabel>Confirm Email</FieldLabel>
            <FieldInput form={seed(name)} type="email" />
            <FieldHelp />
          </Field>
          <LastField name="password">
            <FieldLabel>Password</FieldLabel>
            <FieldInput form={seed(name)} type="password" />
            <FieldHelp />
          </LastField>
          <Button
            form={seed(name)}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            Register
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default RegisterForm
