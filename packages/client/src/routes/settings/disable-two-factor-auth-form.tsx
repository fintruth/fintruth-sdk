import { useMutation } from '@apollo/react-hooks'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import BaseField, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help } from 'styles/mixins'
import {
  DisableTwoFactorAuthMutationData,
  DisableTwoFactorAuthMutationVariables,
  disableTwoFactorAuthMutation,
  shallowCurrentUserQuery,
} from './graphql'
import { button, field, form } from './mixins'

interface HelpProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color
}

interface Props
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  > {
  onCompleted?: () => void
}

interface Values {
  token: string
}

const initialValues: Values = { token: '' }

const name = 'disable-two-factor-auth-form'

const Help = styled.p.attrs((props: HelpProps) => ({
  color: 'danger',
  ...props,
}))`
  ${({ color, theme }) => help(theme[color])};
  margin: 0 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
  align-items: center;
`

const Field = styled(BaseField)`
  ${field};
`

const Button = styled(BaseButton)`
  ${button};
  align-self: unset;
`

const DisableTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  onCompleted,
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    DisableTwoFactorAuthMutationData,
    DisableTwoFactorAuthMutationVariables
  >(disableTwoFactorAuthMutation, {
    awaitRefetchQueries: true,
    onCompleted: ({ response }) => {
      if (response.error) {
        return setHelpProps({ children: response.error.message })
      }

      return onCompleted && onCompleted()
    },
    refetchQueries: ({ data }) =>
      path(['response', 'error'], data)
        ? []
        : [{ query: shallowCurrentUserQuery }],
  })

  return (
    <>
      {helpProps && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={variables => onSubmit({ variables })}
      >
        <Form {...props} id={seed(name)} noValidate>
          <Field name="token">
            <FieldLabel>Verification Code</FieldLabel>
            <FieldInput form={seed(name)} />
            <FieldHelp />
          </Field>
          <Button
            form={seed(name)}
            isLoading={isSubmitting}
            isOutlined
            type="submit"
            variant="danger"
          >
            Disable
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default DisableTwoFactorAuthForm
