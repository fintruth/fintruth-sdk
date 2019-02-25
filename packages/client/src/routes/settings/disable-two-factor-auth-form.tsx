import React from 'react'
import styled from 'styled-components'
import { Form as BaseForm, Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { User } from '@fintruth-sdk/shared'
import { object, string } from 'yup'
import { rem } from 'polished'

import BaseButton from 'components/button'
import BaseControlledInputField from 'components/controlled-input-field'
import BaseNotice, { Status } from 'components/notice'
import {
  DisableTwoFactorAuthMutationData,
  DisableTwoFactorAuthMutationVariables,
  accountQuery,
  disableTwoFactorAuthMutation,
} from './graphql'
import { button, field, form, notice } from './mixins'

interface Props {
  onCompleted?: () => void
  user: User
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

const ControlledInputField = styled(BaseControlledInputField)`
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

const formId = 'disable-two-factor-auth-app__Form'

const DisableTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  onCompleted,
  user,
  ...rest
}: Props) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState<Status>('success')

  return (
    <Mutation<
      DisableTwoFactorAuthMutationData,
      DisableTwoFactorAuthMutationVariables
    >
      mutation={disableTwoFactorAuthMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setNotice(response.error.message)
          setStatus('failure')
        } else if (onCompleted) {
          onCompleted()
        }
      }}
      update={(cache, { data = { response: { error: null } } }) =>
        data.response.error
          ? undefined
          : cache.writeQuery({
              data: { user: { ...user, isTwoFactorAuthEnabled: false } },
              query: accountQuery,
            })
      }
    >
      {(onSubmit, { loading }) => (
        <Formik<Values>
          initialValues={initialValues}
          onSubmit={variables => onSubmit({ variables })}
          validationSchema={validationSchema}
        >
          {() => (
            <React.Fragment>
              {notice && <Notice status={status}>{notice}</Notice>}
              <Form {...rest} id={formId} noValidate>
                <ControlledInputField
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
                  isOutlined
                  status="danger"
                  type="submit"
                >
                  DISABLE
                </Button>
              </Form>
            </React.Fragment>
          )}
        </Formik>
      )}
    </Mutation>
  )
}

export default DisableTwoFactorAuthForm
