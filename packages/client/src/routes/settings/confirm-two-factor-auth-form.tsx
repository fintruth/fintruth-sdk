import React from 'react'
import styled, { NoticeVariant } from 'styled-components' // eslint-disable-line import/named
import { ApolloConsumer, Mutation } from 'react-apollo'
import { Form as BaseForm, Formik } from 'formik'
import { object, string } from 'yup'
import { rem } from 'polished'

import BaseButton from 'components/button'
import BaseInput from 'components/input'
import BaseNotice from 'components/notice'
import {
  ConfirmTwoFactorAuthMutationData,
  ConfirmTwoFactorAuthMutationVariables,
  confirmTwoFactorAuthMutation,
} from './graphql'
import { button, field, form, notice } from './mixins'

interface Props {
  onCompleted?: () => void
}

interface Values {
  token: string
}

const Notice = styled(BaseNotice)`
  ${notice}
  margin: 0 0 ${rem(30)};
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
  const [notice, setNotice] = React.useState<null | string>(null)
  const [variant, setVariant] = React.useState<NoticeVariant>('success')

  return (
    <ApolloConsumer>
      {client => (
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
              setNotice(response.error.message)
              setVariant('danger')
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
                {notice && <Notice variant={variant}>{notice}</Notice>}
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
                    status="primary"
                    type="submit"
                  >
                    ENABLE
                  </Button>
                </Form>
              </React.Fragment>
            </Formik>
          )}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default ConfirmTwoFactorAuthForm
