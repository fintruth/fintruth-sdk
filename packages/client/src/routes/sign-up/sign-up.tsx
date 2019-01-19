import React from 'react'
import styled from 'styled-components'
import { Form as BaseForm, Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { RouteComponentProps, navigate } from '@reach/router'
import { object, ref, string } from 'yup'
import { path } from 'ramda'
import { rem } from 'polished'
import BaseButton from 'components/button'
import BaseSubnavbar from 'components/subnavbar'
import ControlledInputField from 'components/controlled-input-field'
import { centered, notice } from 'styles/mixins'
import { signUpMutation } from './graphql'

interface Data {
  input: Values
}

interface Values {
  email: string
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

const Notice = styled.div`
  ${notice};
  margin: ${rem(-10)} 0 ${rem(30)};
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
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirm: '',
}

const inputFieldsProps = [
  {
    autoComplete: 'given-name',
    label: 'FIRST NAME',
    name: 'firstName',
    type: 'text',
  },
  {
    autoComplete: 'family-name',
    label: 'LAST NAME',
    name: 'lastName',
    type: 'text',
  },
  {
    autoComplete: 'off',
    label: 'EMAIL',
    name: 'email',
    type: 'email',
  },
  {
    autoComplete: 'off',
    label: 'PASSWORD',
    name: 'password',
    type: 'password',
  },
  {
    autoComplete: 'off',
    label: 'CONFIRM PASSWORD',
    name: 'passwordConfirm',
    type: 'password',
  },
]

const items = [
  { id: 'sign-in', content: 'SIGN IN', to: '/sign-in' },
  { id: 'sign-up', content: 'SIGN UP', to: '/sign-up' },
]

const validationSchema = object().shape({
  email: string()
    .required('Enter email')
    .email('Enter a valid email'),
  firstName: string().required('Enter first name'),
  lastName: string().required('Enter last name'),
  password: string().required('Enter password'),
  passwordConfirm: string()
    .required('Confirm password')
    .oneOf([ref('password')], 'Passwords do not match'),
})

const formId = 'sign-up__Form'

const SignUp: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => (
  <Mutation<Data>
    mutation={signUpMutation}
    onCompleted={() => navigate('/sign-in')}
  >
    {(onSubmit, { error }) => {
      const notice = path(['graphQLErrors', '0', 'message'], error)

      return (
        <Root {...rest}>
          <Subnavbar items={items} />
          {notice && <Notice>{notice}</Notice>}
          <Formik<Values>
            initialValues={initialValues}
            onSubmit={input => onSubmit({ variables: { input } })}
            validationSchema={validationSchema}
          >
            {() => (
              <Form id={formId} noValidate>
                {inputFieldsProps.map(inputFieldProps => (
                  <ControlledInputField
                    {...inputFieldProps}
                    id={`${formId}-${inputFieldProps.name}`}
                    form={formId}
                    isRequired
                    key={inputFieldProps.name}
                  />
                ))}
                <Button form={formId} status="primary" type="submit">
                  SIGN UP
                </Button>
              </Form>
            )}
          </Formik>
        </Root>
      )
    }}
  </Mutation>
)

export default SignUp
