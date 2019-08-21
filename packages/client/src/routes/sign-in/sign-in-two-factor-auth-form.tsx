import { useMutation } from '@apollo/react-hooks'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help } from 'styles/mixins'
import { form } from 'translations'
import {
  SignInTwoFactorAuthMutationData,
  SignInTwoFactorAuthMutationVariables,
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

const name = 'sign-in-two-factor-auth-form'

const initialValues: Values = { token: '' }

const Help = styled.p.attrs((props: HelpProps) => ({
  color: 'danger',
  ...props,
}))`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
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
  onCompleted,
  signInCredentials,
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    SignInTwoFactorAuthMutationData,
    SignInTwoFactorAuthMutationVariables
  >(signInTwoFactorAuthMutation, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ response }) =>
      response.error
        ? setHelpProps({ children: response.error.message })
        : onCompleted(),
  })

  return (
    <>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={variables =>
          onSubmit({ variables: { ...signInCredentials, ...variables } })
        }
      >
        <Form {...props} id={seed(name)} noValidate>
          <LastField name="token">
            <FieldLabel>
              <FormattedMessage {...form.field.label.verificationCode} />
            </FieldLabel>
            <FieldInput form={seed(name)} />
            <FieldHelp />
          </LastField>
          <Button
            form={seed(name)}
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
