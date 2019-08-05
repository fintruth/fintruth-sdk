import { useMutation } from '@apollo/react-hooks'
import { User } from '@fintruth-sdk/common'
import { Link as BaseLink } from '@reach/router'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help, link } from 'styles/mixins'
import {
  SignInMutationData,
  SignInMutationVariables,
  signInMutation,
} from './graphql'
import { SignInCredentials } from './sign-in-two-factor-auth-form'

interface HelpProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color
}

interface Props
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  > {
  onCompleted: (user: User) => void
  setSignInCredentials: (signInCredentials: SignInCredentials) => void
}

interface Values {
  email: string
  password: string
}

const initialValues: Values = { email: '', password: '' }

const name = 'sign-in-form'

const Help = styled.p.attrs((props: HelpProps) => ({
  color: 'danger',
  ...props,
}))`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
`

const Link = styled(BaseLink)`
  ${link};
  display: block;
  font-size: ${rem(12)};
  margin-bottom: ${rem(40)};
`

const Button = styled(BaseButton)`
  display: block;
  margin: 0 auto;
`

const SignInForm: React.FunctionComponent<Props> = ({
  onCompleted,
  setSignInCredentials,
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    SignInMutationData,
    SignInMutationVariables
  >(signInMutation, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ response }) => {
      if (response.error) {
        return setHelpProps({ children: response.error.message })
      }

      return response.user && onCompleted(response.user)
    },
  })

  return (
    <React.Fragment>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={variables =>
          onSubmit({ variables }).then(value =>
            path(['data', 'response', 'user'], value)
              ? setSignInCredentials(variables)
              : undefined
          )
        }
      >
        <Form {...props} id={seed(name)} noValidate>
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <FieldInput form={seed(name)} type="email" />
            <FieldHelp />
          </Field>
          <Field name="password">
            <FieldLabel>Password</FieldLabel>
            <FieldInput form={seed(name)} type="password" />
            <FieldHelp />
          </Field>
          <Link to="/recover">Forgot your password?</Link>
          <Button
            form={seed(name)}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            Sign In
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default SignInForm
