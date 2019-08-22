import { useMutation } from '@apollo/react-hooks'
import { object, ref, string } from '@fintruth-sdk/validation'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help } from 'styles/mixins'
import { form } from 'translations'
import {
  RegisterMutationData,
  RegisterMutationVariables,
  registerMutation,
} from './graphql'

type Props = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onReset' | 'onSubmit'
>

interface HelpProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color
}

interface ProfileValues {
  familyName: string
  givenName: string
}

interface Values {
  email: string
  emailConfirm: string
  password: string
  profile: ProfileValues
}

const initialValues: Values = {
  email: '',
  emailConfirm: '',
  password: '',
  profile: { familyName: '', givenName: '' },
}

const validationSchema = object().shape({
  emailConfirm: string().oneOf([ref('email')], 'Retype the email address'),
})

const Help = styled.p.attrs((props: HelpProps) => ({
  color: 'success',
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

const RegisterForm: React.FunctionComponent<Props> = ({
  id,
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const { formatMessage } = useIntl()
  const seed = useUIDSeed()
  const formId = id || seed('register-form')

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    RegisterMutationData,
    RegisterMutationVariables
  >(registerMutation, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ response }) => {
      setHelpProps(
        response.error
          ? { children: response.error.message, color: 'danger' }
          : { children: formatMessage(form.success.verificationEmail) }
      )
    },
  })

  return (
    <>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={({ emailConfirm: _, ...input }, { resetForm }) =>
          onSubmit({ variables: { input } }).then(value =>
            path(['data', 'response', 'error'], value) ? undefined : resetForm()
          )
        }
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
      >
        <Form id={formId} noValidate {...props}>
          <Field name="profile.givenName">
            <FieldLabel>
              <FormattedMessage {...form.field.label.firstName} />
            </FieldLabel>
            <FieldInput autoComplete="given-name" form={formId} />
            <FieldHelp />
          </Field>
          <Field name="profile.familyName">
            <FieldLabel>
              <FormattedMessage {...form.field.label.lastName} />
            </FieldLabel>
            <FieldInput autoComplete="family-name" form={formId} />
            <FieldHelp />
          </Field>
          <Field name="email">
            <FieldLabel>
              <FormattedMessage {...form.field.label.email} />
            </FieldLabel>
            <FieldInput form={formId} type="email" />
            <FieldHelp />
          </Field>
          <Field name="emailConfirm">
            <FieldLabel>
              <FormattedMessage {...form.field.label.confirmEmail} />
            </FieldLabel>
            <FieldInput form={formId} type="email" />
            <FieldHelp />
          </Field>
          <LastField name="password">
            <FieldLabel>
              <FormattedMessage {...form.field.label.password} />
            </FieldLabel>
            <FieldInput form={formId} type="password" />
            <FieldHelp />
          </LastField>
          <Button
            form={formId}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            <FormattedMessage {...form.submit.register} />
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default RegisterForm
