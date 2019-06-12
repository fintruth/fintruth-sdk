import { useMutation } from '@apollo/react-hooks'
import { Omit, User } from '@fintruth-sdk/common'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'
import { object, string } from 'yup'

import BaseButton from 'components/button'
import BaseTextField, {
  TextFieldControl,
  TextFieldHelp,
  TextFieldInput,
  TextFieldLabel,
} from 'components/text-field'
import { help } from 'styles/mixins'
import {
  DisableTwoFactorAuthMutationData,
  DisableTwoFactorAuthMutationVariables,
  accountQuery,
  disableTwoFactorAuthMutation,
} from './graphql'
import { button, field, form } from './mixins'

interface Props
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  > {
  onCompleted?: () => void
  user: User
}

interface Values {
  token: string
}

const initialValues: Values = { token: '' }

const validationSchema = object().shape({
  token: string().required('This is a required field'),
})

const formId = 'disable-two-factor-auth__Form'

const Help = styled.p`
  ${({ theme }) => help(theme.danger)};
  margin: 0 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
  align-items: center;
`

const TextField = styled(BaseTextField)`
  ${field};
`

const Button = styled(BaseButton)`
  ${button};
  align-self: unset;
`

const DisableTwoFactorAuthForm: React.FunctionComponent<Props> = ({
  onCompleted,
  user,
  ...props
}: Props) => {
  const [helpContent, setHelpContent] = React.useState<string>()

  const [onSubmit, { loading }] = useMutation<
    DisableTwoFactorAuthMutationData,
    DisableTwoFactorAuthMutationVariables
  >(disableTwoFactorAuthMutation, {
    onCompleted: ({ response }) => {
      if (response.error) {
        setHelpContent(response.error.message)
      } else if (onCompleted) {
        onCompleted()
      }
    },
    update: (cache, { data }) =>
      data && data.response.error
        ? undefined
        : cache.writeQuery({
            data: { user: { ...user, isTwoFactorAuthEnabled: false } },
            query: accountQuery,
          }),
  })

  return (
    <React.Fragment>
      {helpContent && <Help>{helpContent}</Help>}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={variables => onSubmit({ variables })}
        validationSchema={validationSchema}
      >
        <Form {...props} id={formId} noValidate>
          <TextField name="token">
            <TextFieldLabel>VERIFICATION CODE</TextFieldLabel>
            <TextFieldControl>
              <TextFieldInput form={formId} />
            </TextFieldControl>
            <TextFieldHelp />
          </TextField>
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
      </Formik>
    </React.Fragment>
  )
}

export default DisableTwoFactorAuthForm
