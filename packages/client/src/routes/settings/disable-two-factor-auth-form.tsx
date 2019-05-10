import React from 'react'
import styled, { NoticeVariant } from 'styled-components' // eslint-disable-line import/named
import { Form as BaseForm, Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { User } from '@fintruth-sdk/shared'
import { object, string } from 'yup'
import { rem } from 'polished'

import BaseButton from 'components/button'
import BaseInput from 'components/input'
import BaseNotice from 'components/notice'
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

const formId = 'disable-two-factor-auth__Form'

const DisableTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  onCompleted,
  user,
  ...props
}: Props) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [variant, setVariant] = React.useState<NoticeVariant>('success')

  return (
    <Mutation<
      DisableTwoFactorAuthMutationData,
      DisableTwoFactorAuthMutationVariables
    >
      mutation={disableTwoFactorAuthMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setNotice(response.error.message)
          setVariant('danger')
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
                isOutlined
                type="submit"
                variant="danger"
              >
                DISABLE
              </Button>
            </Form>
          </React.Fragment>
        </Formik>
      )}
    </Mutation>
  )
}

export default DisableTwoFactorAuthForm
