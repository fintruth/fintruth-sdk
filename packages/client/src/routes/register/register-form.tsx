import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { object, ref, string } from '@fintruth-sdk/validation'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help } from 'styles/mixins'
import { toRegisterInput } from 'utilities/graphql'
import {
  RegisterMutationData,
  RegisterMutationVariables,
  registerMutation,
} from './graphql'

type Props = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onReset' | 'onSubmit'
>

interface HelpProps {
  color: Color
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
  profile: {
    familyName: '',
    givenName: '',
  },
}

const validationSchema = object().shape({
  emailConfirm: string().oneOf([ref('email')], 'Retype the email address'),
})

const formId = 'register__Form'

const Help = styled.p<HelpProps>`
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

const RegisterForm: React.FunctionComponent<Props> = ({ ...props }: Props) => {
  const [helpColor, setHelpColor] = React.useState<Color>('success')
  const [helpContent, setHelpContent] = React.useState<string>()
  const client = useApolloClient()

  const [onSubmit, { loading }] = useMutation<
    RegisterMutationData,
    RegisterMutationVariables
  >(registerMutation, {
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
        setHelpContent('A verification email has been sent')
      }
    },
  })

  return (
    <React.Fragment>
      {helpContent && <Help color={helpColor}>{helpContent}</Help>}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) =>
          onSubmit({ variables: { input: toRegisterInput(values) } }).then(
            value =>
              path(['data', 'response', 'error'], value)
                ? undefined
                : resetForm()
          )
        }
        validationSchema={validationSchema}
      >
        <Form {...props} id={formId} noValidate>
          <Field name="profile.givenName">
            <FieldLabel>FIRST NAME</FieldLabel>
            <FieldInput autoComplete="given-name" form={formId} />
            <FieldHelp />
          </Field>
          <Field name="profile.familyName">
            <FieldLabel>LAST NAME</FieldLabel>
            <FieldInput autoComplete="family-name" form={formId} />
            <FieldHelp />
          </Field>
          <Field name="email">
            <FieldLabel>EMAIL</FieldLabel>
            <FieldInput form={formId} type="email" />
            <FieldHelp />
          </Field>
          <Field name="emailConfirm">
            <FieldLabel>CONFIRM EMAIL</FieldLabel>
            <FieldInput form={formId} type="email" />
            <FieldHelp />
          </Field>
          <LastField name="password">
            <FieldLabel>PASSWORD</FieldLabel>
            <FieldInput form={formId} type="password" />
            <FieldHelp />
          </LastField>
          <Button
            form={formId}
            isLoading={loading}
            type="submit"
            variant="primary"
          >
            REGISTER
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default RegisterForm
