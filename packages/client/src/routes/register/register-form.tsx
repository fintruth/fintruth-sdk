import { Omit } from '@fintruth-sdk/shared'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { ApolloContext, Mutation } from 'react-apollo'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named
import { object, ref, string } from 'yup'

import BaseButton from 'components/button'
import Input from 'components/input'
import { help } from 'styles/mixins'
import {
  RegisterFormMutationData,
  RegisterFormMutationVariables,
  registerFormMutation,
} from './graphql'

type Props = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onReset' | 'onSubmit'
>

interface HelpProps {
  color: Color
}

interface Values {
  email: string
  emailConfirm: string
  firstName: string
  lastName: string
  password: string
}

const initialValues: Values = {
  email: '',
  emailConfirm: '',
  firstName: '',
  lastName: '',
  password: '',
}

const validationSchema = object().shape({
  email: string()
    .required('This is a required field')
    .email('Please provide a valid email address'),
  emailConfirm: string()
    .required('This is a required field')
    .oneOf([ref('email')], 'Please retype the email address'),
  firstName: string().required('This is a required field'),
  lastName: string().required('This is a required field'),
  password: string()
    .required('This is a required field')
    .min(10, 'Minimum length is ${min} characters'), // eslint-disable-line no-template-curly-in-string
})

const formId = 'register__Form'

const Help = styled.p<HelpProps>`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
`

const LastInput = styled(Input)`
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
  const { client } = React.useContext(ApolloContext as any)

  return (
    <Mutation<RegisterFormMutationData, RegisterFormMutationVariables>
      mutation={registerFormMutation}
      onCompleted={({ response }) => {
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
      }}
    >
      {(onSubmit, { loading }) => (
        <React.Fragment>
          {helpContent && <Help color={helpColor}>{helpContent}</Help>}
          <Formik<Values>
            initialValues={initialValues}
            onSubmit={(input, { resetForm }) =>
              onSubmit({ variables: { input } }).then(
                value =>
                  path(['data', 'response', 'error'], value) && resetForm()
              )
            }
            validationSchema={validationSchema}
          >
            <Form {...props} id={formId} noValidate>
              <Input
                id={`${formId}-firstName`}
                autoComplete="given-name"
                form={formId}
                label="FIRST NAME"
                name="firstName"
                type="text"
              />
              <Input
                id={`${formId}-lastName`}
                autoComplete="family-name"
                form={formId}
                label="LAST NAME"
                name="lastName"
                type="text"
              />
              <Input
                id={`${formId}-email`}
                autoComplete="off"
                form={formId}
                label="EMAIL"
                name="email"
                type="email"
              />
              <Input
                id={`${formId}-emailConfirm`}
                autoComplete="off"
                form={formId}
                label="CONFIRM EMAIL"
                name="emailConfirm"
                type="email"
              />
              <LastInput
                id={`${formId}-password`}
                autoComplete="off"
                form={formId}
                label="PASSWORD"
                name="password"
                type="password"
              />
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
      )}
    </Mutation>
  )
}

export default RegisterForm
