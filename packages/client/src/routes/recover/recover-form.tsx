import { useMutation } from '@apollo/react-hooks'
import { User } from '@fintruth-sdk/common'
import { Link as BaseLink } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { link } from 'styles/deprecated'
import { help } from 'styles/mixins'
import {
  RecoverMutationData,
  RecoverMutationVariables,
  recoverMutation,
} from './graphql'

interface HelpProps {
  color: Color
}

interface Props
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  > {
  user?: User
}

interface Values {
  email: string
}

const formId = 'recover__Form'

const Help = styled.p<HelpProps>`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  display: flex;
  flex-direction: column;
  width: ${rem(280)};
`

const Button = styled(BaseButton)`
  align-self: center;
  margin-top: ${rem(40)};
`

const Description = styled.div`
  font-size: ${rem(12)};
  margin-top: ${rem(16)};
`

const Link = styled(BaseLink)`
  ${link};
`

const RecoverForm: React.FunctionComponent<Props> = ({
  user,
  ...props
}: Props) => {
  const [helpColor, setHelpColor] = React.useState<Color>('success')
  const [helpContent, setHelpContent] = React.useState<string>()

  const [onSubmit, { loading }] = useMutation<
    RecoverMutationData,
    RecoverMutationVariables
  >(recoverMutation, {
    onCompleted: ({ response }) => {
      if (response.error) {
        setHelpColor('danger')
        setHelpContent(response.error.message)
      } else {
        setHelpColor('success')
        setHelpContent('A verification email has been sent')
      }
    },
  })

  return (
    <React.Fragment>
      {helpContent && <Help color={helpColor}>{helpContent}</Help>}
      <Formik<Values>
        initialValues={{ email: user ? user.emails[0].value : '' }}
        onSubmit={(variables, { resetForm }) =>
          onSubmit({ variables }).then(value =>
            path(['data', 'response', 'error'], value) ? undefined : resetForm()
          )
        }
      >
        <Form {...props} id={formId} noValidate>
          <Field name="email">
            <FieldLabel>EMAIL</FieldLabel>
            <FieldInput form={formId} type="email" />
            <FieldHelp />
          </Field>
          <Description>
            Already have email and password?{' '}
            {user ? (
              <Link to="/settings">Settings</Link>
            ) : (
              <Link to="/sign-in">Sign in</Link>
            )}
          </Description>
          <Button
            form={formId}
            isLoading={loading}
            type="submit"
            variant="primary"
          >
            RECOVER
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default RecoverForm
