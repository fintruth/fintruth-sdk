import { useMutation } from '@apollo/react-hooks'
import { Link as BaseLink } from '@reach/router'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components'

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { form } from 'i18n'
import { help, link } from 'styles/mixins'
import { hasResponseError } from 'utils/apollo'
import {
  SignInMutationData,
  SignInMutationVariables,
  currentUserQuery,
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

const Help = styled.p.attrs((attrs) => ({ color: 'danger', ...attrs }))<
  HelpProps
>`
  ${({ color, theme }) => help(theme[color])};
  margin-bottom: ${rem(30)};

  &:not(:first-child) {
    margin-top: ${rem(-10)};
  }
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
  id,
  onCompleted,
  setSignInCredentials,
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()
  const formId = id || seed('sign-in-form')

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    SignInMutationData,
    SignInMutationVariables
  >(signInMutation, {
    awaitRefetchQueries: true,
    fetchPolicy: 'no-cache',
    onCompleted: ({ response }) =>
      response.error
        ? setHelpProps({ children: response.error.message })
        : onCompleted(response.isTwoFactorAuthEnabled),
    refetchQueries: ({ data }) =>
      hasResponseError(data) || data.response.isTwoFactorAuthEnabled
        ? []
        : [{ query: currentUserQuery }],
  })

  return (
    <>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={(variables) =>
          onSubmit({ variables }).then(({ data }) =>
            data && data.response.isTwoFactorAuthEnabled
              ? setSignInCredentials(variables)
              : undefined
          )
        }
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form id={formId} noValidate {...props}>
          <Field name="email">
            <FieldLabel>
              <FormattedMessage {...form.field.label.email} />
            </FieldLabel>
            <FieldInput form={formId} type="email" />
            <FieldHelp />
          </Field>
          <Field name="password">
            <FieldLabel>
              <FormattedMessage {...form.field.label.password} />
            </FieldLabel>
            <FieldInput form={formId} type="password" />
            <FieldHelp />
          </Field>
          <Link to="/recover">
            <FormattedMessage {...translations.accountHelp.recover} />
          </Link>
          <Button
            form={formId}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            <FormattedMessage {...form.submit.signIn} />
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default SignInForm
