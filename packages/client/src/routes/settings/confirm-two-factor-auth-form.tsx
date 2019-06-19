import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Omit } from '@fintruth-sdk/common'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import BaseButton from 'components/button'
import BaseField, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help } from 'styles/mixins'
import {
  ConfirmTwoFactorAuthMutationData,
  ConfirmTwoFactorAuthMutationVariables,
  confirmTwoFactorAuthMutation,
} from './graphql'
import { button, field, form } from './mixins'

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

const formId = 'confirm-two-factor-auth__Form'

const Help = styled.p`
  ${({ theme }) => help(theme.danger)};
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

const ConfirmTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  onCompleted,
  ...props
}: Props) => {
  const [helpContent, setHelpContent] = React.useState<string>()
  const client = useApolloClient()

  const [onSubmit, { loading }] = useMutation<
    ConfirmTwoFactorAuthMutationData,
    ConfirmTwoFactorAuthMutationVariables
  >(confirmTwoFactorAuthMutation, {
    onCompleted: ({ response }) => {
      // NOTE: Due to the inability to invalidate Apollo's cache the
      // entire store needs to be reset in order to prevent storing
      // private data
      client.resetStore()

      if (response.error) {
        setHelpContent(response.error.message)
      } else if (onCompleted) {
        onCompleted()
      }
    },
  })

  return (
    <React.Fragment>
      {helpContent && <Help>{helpContent}</Help>}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={variables => onSubmit({ variables })}
      >
        <Form {...props} id={formId} noValidate>
          <Field name="token">
            <FieldLabel>VERIFICATION CODE</FieldLabel>
            <FieldInput form={formId} />
            <FieldHelp />
          </Field>
          <Button
            form={formId}
            isLoading={loading}
            type="submit"
            variant="primary"
          >
            ENABLE
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default ConfirmTwoFactorAuthForm
