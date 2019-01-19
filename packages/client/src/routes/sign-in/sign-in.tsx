import React from 'react'
import styled from 'styled-components'
import { Form as BaseForm, Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { RouteComponentProps, navigate } from '@reach/router'
import { object, string } from 'yup'
import { path } from 'ramda'
import { rem } from 'polished'
import BaseButton from 'components/button'
import BaseSubnavbar from 'components/subnavbar'
import ControlledInputField from 'components/controlled-input-field'
import { centered, notice } from 'styles/mixins'
import { signInMutation, signInQuery } from './graphql'

interface Data {
  input: Values
}

interface Values {
  email: string
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

const initialValues = { email: '', password: '' }

const inputFieldsProps = [
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
]

const items = [
  { id: 'sign-in', content: 'SIGN IN', to: '/sign-in' },
  { id: 'sign-up', content: 'SIGN UP', to: '/sign-up' },
]

const validationSchema = object().shape({
  email: string()
    .required('Enter email')
    .email('Enter a valid email'),
  password: string().required('Enter password'),
})

const formId = 'sign-in__Form'

const SignIn: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => (
  <Mutation<Data>
    mutation={signInMutation}
    onCompleted={() => navigate('/')}
    update={(cache, { data }) => cache.writeQuery({ data, query: signInQuery })}
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
                  SIGN IN
                </Button>
              </Form>
            )}
          </Formik>
        </Root>
      )
    }}
  </Mutation>
)

export default SignIn
