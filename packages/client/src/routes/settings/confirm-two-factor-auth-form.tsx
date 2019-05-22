import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { ApolloContext, Mutation } from 'react-apollo'
import styled from 'styled-components'
import { object, string } from 'yup'

import BaseButton from 'components/button'
import BaseInput from 'components/input'
import { help } from 'styles/mixins'
import {
  ConfirmTwoFactorAuthMutationData,
  ConfirmTwoFactorAuthMutationVariables,
  confirmTwoFactorAuthMutation,
} from './graphql'
import { button, field, form } from './mixins'

interface Props {
  onCompleted?: () => void
}

interface Values {
  token: string
}

const Help = styled.p`
  ${({ theme }) => help(theme.danger)};
  margin: 0 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
  align-items: center;
`

const Input = styled(BaseInput)`
  ${field};
`

const Button = styled(BaseButton)`
  ${button};
  align-self: unset;
`

const initialValues = { token: '' }

const validationSchema = object().shape({
  token: string().required('This is a required field'),
})

const formId = 'confirm-two-factor-auth__Form'

const ConfirmTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  onCompleted,
  ...props
}: Props) => {
  const [helpContent, setHelpContent] = React.useState<string>()
  const { client } = React.useContext(ApolloContext as any)

  return (
    <Mutation<
      ConfirmTwoFactorAuthMutationData,
      ConfirmTwoFactorAuthMutationVariables
    >
      mutation={confirmTwoFactorAuthMutation}
      onCompleted={({ response }) => {
        // NOTE: Due to the inability to invalidate Apollo's cache the
        // entire store needs to be reset in order to prevent storing
        // private data
        client.resetStore()

        if (response.error) {
          setHelpContent(response.error.message)
        } else if (onCompleted) {
          onCompleted()
        }
      }}
    >
      {(onSubmit, { loading }) => (
        <Formik<Values>
          initialValues={initialValues}
          onSubmit={variables => onSubmit({ variables })}
          validationSchema={validationSchema}
        >
          <React.Fragment>
            {helpContent && <Help>{helpContent}</Help>}
            <Form {...props} id={formId} noValidate>
              <Input
                id={`${formId}-token`}
                autoComplete="off"
                form={formId}
                label="VERIFICATION CODE"
                name="token"
                type="text"
              />
              <Button
                form={formId}
                isLoading={loading}
                type="submit"
                variant="primary"
              >
                ENABLE
              </Button>
            </Form>
          </React.Fragment>
        </Formik>
      )}
    </Mutation>
  )
}

export default ConfirmTwoFactorAuthForm
