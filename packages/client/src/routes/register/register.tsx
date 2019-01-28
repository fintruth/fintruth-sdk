import React from 'react'
import styled from 'styled-components'
import { Form as BaseForm, Formik } from 'formik'
import { MutationFn } from 'react-apollo'
import { RouteComponentProps } from '@reach/router' // eslint-disable-line typescript/no-unused-vars
import { object, ref, string } from 'yup'
import { rem } from 'polished'
import BaseButton from 'components/button'
import BaseNotice from 'components/notice'
import BaseSubnavbar from 'components/subnavbar'
import ControlledInputField from 'components/controlled-input-field'
import { centered } from 'styles/mixins'

export interface Data {
  response: Response
}

interface Response {
  error: any
  token: string
}

interface Props extends RouteComponentProps {
  notice: null | string
  onSubmit: MutationFn<Data, Variables>
  status: string
}

interface Values {
  email: string
  emailConfirm: string
  firstName: string
  lastName: string
  password: string
}

export interface Variables {
  input: Values
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

const Notice = styled(BaseNotice)`
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

const Register: React.FunctionComponent<Props> = ({
  notice,
  onSubmit,
  status,
  ...rest
}: Props) => (
  <Root {...rest}>
    <Subnavbar items={items} />
    {notice && <Notice status={status}>{notice}</Notice>}
    <Formik<Values>
      initialValues={initialValues}
      onSubmit={input => onSubmit({ variables: { input } })}
      validationSchema={validationSchema}
    >
      {() => (
        <Form id={formId} noValidate>
          <ControlledInputField
            id={`${formId}-firstName`}
            autoComplete="given-name"
            form={formId}
            label="FIRST NAME"
            name="firstName"
            type="text"
          />
          <ControlledInputField
            id={`${formId}-lastName`}
            autoComplete="family-name"
            form={formId}
            label="LAST NAME"
            name="lastName"
            type="text"
          />
          <ControlledInputField
            id={`${formId}-email`}
            autoComplete="off"
            form={formId}
            label="EMAIL"
            name="email"
            type="email"
          />
          <ControlledInputField
            id={`${formId}-emailConfirm`}
            autoComplete="off"
            form={formId}
            label="CONFIRM EMAIL"
            name="emailConfirm"
            type="email"
          />
          <ControlledInputField
            id={`${formId}-password`}
            autoComplete="off"
            form={formId}
            label="PASSWORD"
            name="password"
            type="password"
          />
          <Button form={formId} status="primary" type="submit">
            REGISTER
          </Button>
        </Form>
      )}
    </Formik>
  </Root>
)

export default Register
