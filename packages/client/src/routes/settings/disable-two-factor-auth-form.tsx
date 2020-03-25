import { useMutation } from '@apollo/react-hooks'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components'

import BaseButton from 'components/button'
import BaseField, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help } from 'styles/mixins'
import { hasResponseError } from 'utils/apollo'
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

const Help = styled.p.attrs((attrs) => ({ color: 'danger', ...attrs }))<
  HelpProps
>`
  ${({ color, theme }) => help(theme[color])};
  margin-bottom: ${rem(30)};
  width: ${rem(280)};

  &:not(:first-child) {
    margin-top: unset;
  }
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
  id,
  onCompleted,
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()
  const formId = id || seed('disable-two-factor-auth-form')

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
      hasResponseError(data) ? [] : [{ query: shallowCurrentUserQuery }],
  })

  return (
    <>
      {helpProps && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={(variables) => onSubmit({ variables })}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form id={formId} noValidate {...props}>
          <Field name="token">
            <FieldLabel>Verification Code</FieldLabel>
            <FieldInput form={formId} />
            <FieldHelp />
          </Field>
          <Button
            form={formId}
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
