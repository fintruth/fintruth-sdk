import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { User } from '@fintruth-sdk/common'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import BaseField, { FieldHelp, FieldInput } from 'components/field'
import { help } from 'styles/mixins'
import {
  UpdateEmailMutationData,
  UpdateEmailMutationVariables,
  updateEmailMutation,
} from './graphql'
import { button, field, form } from './mixins'

interface HelpProps {
  color: Color
}

interface Props
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  > {
  user: User
}

interface Values {
  newEmail: string
  password: string
}

const formId = 'update-email__Form'

const Help = styled.p<HelpProps>`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
`

const Field = styled(BaseField)`
  ${field};
`

const Button = styled(BaseButton)`
  ${button};
`

const UpdateEmailForm: React.FunctionComponent<Props> = ({
  user,
  ...props
}: Props) => {
  const [helpColor, setHelpColor] = React.useState<Color>('success')
  const [helpContent, setHelpContent] = React.useState<string>()
  const client = useApolloClient()

  const [onSubmit, { loading }] = useMutation<
    UpdateEmailMutationData,
    UpdateEmailMutationVariables
  >(updateEmailMutation, {
    onCompleted: ({ response }) => {
      // NOTE: Due to the inability to invalidate Apollo's cache the
      // entire store needs to be reset in order to prevent storing
      // private data
      client.resetStore()

      if (response.error) {
        setHelpColor('danger')
        setHelpContent(response.error.message)
      } else if (response.user) {
        setHelpColor('success')
        setHelpContent('Your email address was successfully updated')
      }
    },
  })

  return (
    <React.Fragment>
      {helpContent && <Help color={helpColor}>{helpContent}</Help>}
      <Formik<Values>
        initialValues={{ newEmail: user.email, password: '' }}
        onSubmit={(variables, { resetForm }) =>
          onSubmit({ variables }).then(value =>
            path(['data', 'response', 'error'], value) ? undefined : resetForm()
          )
        }
      >
        <Form {...props} id={formId} noValidate>
          <Field name="newEmail">
            <FieldInput form={formId} placeholder="Email" type="email" />
            <FieldHelp />
          </Field>
          <Field name="password">
            <FieldInput form={formId} placeholder="Password" type="password" />
            <FieldHelp />
          </Field>
          <Button
            form={formId}
            isLoading={loading}
            type="submit"
            variant="primary"
          >
            UPDATE
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default UpdateEmailForm
