import { RouteComponentProps } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { Mutation } from 'react-apollo'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named
import { object, ref, string } from 'yup'

import BaseButton from 'components/button'
import Input from 'components/input'
import BaseSubnavbar from 'components/subnavbar'
import { centered } from 'styles/deprecated'
import { help } from 'styles/mixins'
import {
  RegisterMutationData,
  RegisterMutationVariables,
  registerMutation,
} from './graphql'

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

const Root = styled.div`
  ${centered};
  flex-direction: column;
  min-height: 100vh;
`

const Subnavbar = styled(BaseSubnavbar)`
  margin-bottom: ${rem(50)};
  width: ${rem(280)};
`

const Help = styled.p<HelpProps>`
  ${({ color }) => help(color)};
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  display: flex;
  flex-direction: column;
  width: ${rem(280)};
`

const Button = styled(BaseButton)`
  align-self: center;
  margin-top: ${rem(40)};
`

const initialValues = {
  email: '',
  emailConfirm: '',
  firstName: '',
  lastName: '',
  password: '',
}

const items = [
  { id: 'sign-in', content: 'SIGN IN', to: '/sign-in' },
  { id: 'register', content: 'REGISTER', to: '/register' },
]

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

const Register: React.FunctionComponent<RouteComponentProps> = ({
  ...props
}: RouteComponentProps) => {
  const [helpColor, setHelpColor] = React.useState<Color>('success')
  const [helpContent, setHelpContent] = React.useState<string>()

  return (
    <Mutation<RegisterMutationData, RegisterMutationVariables>
      mutation={registerMutation}
      onCompleted={({ response }) => {
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
        <Root data-testid="register" {...props}>
          <Subnavbar items={items} />
          {helpContent && <Help color={helpColor}>{helpContent}</Help>}
          <Formik<Values>
            initialValues={initialValues}
            onSubmit={(input, { resetForm }) =>
              onSubmit({ variables: { input } }).then(value =>
                path(['data', 'response', 'error'], value)
                  ? undefined
                  : resetForm(initialValues)
              )
            }
            validationSchema={validationSchema}
          >
            <Form id={formId} noValidate>
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
              <Input
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
        </Root>
      )}
    </Mutation>
  )
}

export default Register
