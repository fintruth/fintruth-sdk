import React from 'react'
import styled from 'styled-components'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { Form as BaseForm, Formik } from 'formik'
import { Link as BaseLink, RouteComponentProps, navigate } from '@reach/router'
import { UserResponse } from '@fintruth-sdk/shared'
import { object, string } from 'yup'
import { rem } from 'polished'

import BaseButton from 'components/button'
import BaseNotice from 'components/notice'
import BaseSubnavbar from 'components/subnavbar'
import ControlledInputField from 'components/controlled-input-field'
import { centered, link } from 'styles/mixins'
import { renderLoadingIf } from 'utilities/loading'
import { signInMutation, signInQuery } from './graphql'

interface Data {
  response: UserResponse
}

interface Values {
  email: string
  password: string
}

interface Variables {
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

const Link = styled(BaseLink)`
  ${link};
  margin-top: ${rem(16)};
`

const initialValues = { email: '', password: '' }

const items = [
  { id: 'sign-in', content: 'SIGN IN', to: '/sign-in' },
  { id: 'register', content: 'REGISTER', to: '/register' },
]

const validationSchema = object().shape({
  email: string()
    .required('This is a required field')
    .email('Please provide a valid email address'),
  password: string().required('This is a required field'),
})

const formId = 'sign-in__Form'

const SignIn: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Root {...rest}>
      <ApolloConsumer>
        {client => (
          <Mutation<Data, Variables>
            mutation={signInMutation}
            onCompleted={({ response }) => {
              client.resetStore()

              if (response.error) {
                setNotice(response.error.message)
                setStatus('failure')
              } else {
                navigate('/')
              }
            }}
            update={(cache, { data = { response: { user: null } } }) =>
              cache.writeQuery({ data: data.response, query: signInQuery })
            }
          >
            {(onSubmit, { loading }) =>
              renderLoadingIf(loading, () => (
                <React.Fragment>
                  <Subnavbar items={items} />
                  {notice && <Notice status={status}>{notice}</Notice>}
                  <Formik<Values>
                    initialValues={initialValues}
                    onSubmit={variables => onSubmit({ variables })}
                    validationSchema={validationSchema}
                  >
                    {() => (
                      <Form id={formId} noValidate>
                        <ControlledInputField
                          id={`${formId}-email`}
                          autoComplete="off"
                          form={formId}
                          label="EMAIL"
                          name="email"
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
                        <Link to="/recover">Forgot your password?</Link>
                        <Button form={formId} status="primary" type="submit">
                          SIGN IN
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </React.Fragment>
              ))
            }
          </Mutation>
        )}
      </ApolloConsumer>
    </Root>
  )
}

export default SignIn
