import { useMutation } from '@apollo/react-hooks'
import { Link as BaseLink } from '@reach/router'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help, link } from 'styles/mixins'
import { form } from 'translations'
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
  onCompleted: (isTwoFactorAuthEnabled?: boolean) => void
  setSignInCredentials: (signInCredentials: SignInCredentials) => void
}

interface Values {
  email: string
  password: string
}

const name = 'sign-in-form'
const rootId = 'routes.signIn.signInForm'
const accountHelpId = `${rootId}.accountHelp`

const initialValues: Values = { email: '', password: '' }

const translations = {
  accountHelp: defineMessages({
    recover: {
      id: `${accountHelpId}.recover`,
      defaultMessage: 'Forgot your password?',
      description: 'The Recover link in the Account Help section',
    },
  }),
}

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
    onCompleted: ({ response }) =>
      response.error
        ? setHelpProps({ children: response.error.message })
        : onCompleted(response.isTwoFactorAuthEnabled),
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
            <FieldLabel>
              <FormattedMessage {...form.field.label.email} />
            </FieldLabel>
            <FieldInput form={seed(name)} type="email" />
            <FieldHelp />
          </Field>
          <Field name="password">
            <FieldLabel>
              <FormattedMessage {...form.field.label.password} />
            </FieldLabel>
            <FieldInput form={seed(name)} type="password" />
            <FieldHelp />
          </Field>
          <Link to="/recover">
            <FormattedMessage {...translations.accountHelp.recover} />
          </Link>
          <Button
            form={seed(name)}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            <FormattedMessage {...form.submit.signIn} />
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default SignInForm
