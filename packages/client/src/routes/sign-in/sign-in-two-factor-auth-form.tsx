import { useMutation } from '@apollo/react-hooks'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components'

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { form } from 'i18n'
import { help } from 'styles/mixins'
import { hasResponseError } from 'utils/apollo'
import {
  SignInTwoFactorAuthMutationData,
  SignInTwoFactorAuthMutationVariables,
  currentUserQuery,
  signInTwoFactorAuthMutation,
} from './graphql'

interface HelpProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color
}

interface Props
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  > {
  onCompleted: (isTwoFactorAuthEnabled?: boolean) => void
  signInCredentials: SignInCredentials
}

export interface SignInCredentials {
  email: string
  password: string
}

interface Values {
  token: string
}

const initialValues: Values = { token: '' }

const Help = styled.p.attrs((attrs) => ({ color: 'danger', ...attrs }))<
  HelpProps
>`
  ${({ color, theme }) => help(theme[color])};
  margin-bottom: ${rem(30)};

  &:not(:first-child) {
    margin-top: ${rem(-10)};
  }
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

const SignInTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  id,
  onCompleted,
  signInCredentials,
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()
  const formId = id || seed('sign-in-two-factor-auth-form')

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    SignInTwoFactorAuthMutationData,
    SignInTwoFactorAuthMutationVariables
  >(signInTwoFactorAuthMutation, {
    awaitRefetchQueries: true,
    fetchPolicy: 'no-cache',
    onCompleted: ({ response }) =>
      response.error
        ? setHelpProps({ children: response.error.message })
        : onCompleted(),
    refetchQueries: ({ data }) =>
      hasResponseError(data) ? [] : [{ query: currentUserQuery }],
  })

  return (
    <>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={(variables) =>
          onSubmit({ variables: { ...signInCredentials, ...variables } })
        }
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form id={formId} noValidate {...props}>
          <LastField name="token">
            <FieldLabel>
              <FormattedMessage {...form.field.label.verificationCode} />
            </FieldLabel>
            <FieldInput form={formId} />
            <FieldHelp />
          </LastField>
          <Button
            form={formId}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            <FormattedMessage {...form.submit.continue} />
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default SignInTwoFactorAuthForm
