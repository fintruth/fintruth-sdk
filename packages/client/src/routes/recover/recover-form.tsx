import { useMutation } from '@apollo/react-hooks'
import { Link as BaseLink } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { FormattedMessage, defineMessages, useIntl } from 'react-intl'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help, link } from 'styles/mixins'
import {
  QueriedUser,
  RecoverMutationData,
  RecoverMutationVariables,
  recoverMutation,
} from './graphql'

interface HelpProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color
}

interface Props
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  > {
  user?: QueriedUser
}

interface Values {
  email: string
}

const messages = defineMessages({
  success: {
    id: 'routes.recover.recoverForm.success',
    defaultMessage: 'A verification email has been sent',
    description:
      'The message displayed when the form is successfully submitted',
  },
  emailLabel: {
    id: 'routes.recover.recoverForm.emailLabel',
    defaultMessage: 'Email',
    description: 'The label of the Email field',
  },
  accountHelpDescription: {
    id: 'routes.recover.recoverForm.accountHelpDescription',
    defaultMessage: 'Already have email and password?',
    description: 'The description in the Account Help section',
  },
  accountHelpSettings: {
    id: 'routes.recover.recoverForm.accountHelpSettings',
    defaultMessage: 'Settings',
    description: 'The Settings link in the Account Help section',
  },
  accountHelpSignIn: {
    id: 'routes.recover.recoverForm.accountHelpSignIn',
    defaultMessage: 'Sign-In',
    description: 'The Sign-In link in the Account Help section',
  },
  submit: {
    id: 'routes.recover.recoverForm.submit',
    defaultMessage: 'Recover',
    description: 'The text of the submit button',
  },
})

const name = 'recover-form'

const Help = styled.p.attrs((props: HelpProps) => ({
  color: 'success',
  ...props,
}))`
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
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const { formatMessage } = useIntl()
  const seed = useUIDSeed()

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    RecoverMutationData,
    RecoverMutationVariables
  >(recoverMutation, {
    onCompleted: ({ response }) =>
      setHelpProps(
        response.error
          ? { children: response.error.message, color: 'danger' }
          : { children: formatMessage(messages.success) }
      ),
  })

  return (
    <React.Fragment>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={{
          email: user
            ? (user.emails.find(({ isPrimary }) => isPrimary) || { value: '' })
                .value
            : '',
        }}
        onSubmit={(variables, { resetForm }) =>
          onSubmit({ variables }).then(value =>
            path(['data', 'response', 'error'], value) ? undefined : resetForm()
          )
        }
      >
        <Form {...props} id={seed(name)} noValidate>
          <Field name="email">
            <FieldLabel>
              <FormattedMessage {...messages.emailLabel} />
            </FieldLabel>
            <FieldInput form={seed(name)} type="email" />
            <FieldHelp />
          </Field>
          <Description>
            <FormattedMessage {...messages.accountHelpDescription} />{' '}
            {user ? (
              <Link to="/settings">
                <FormattedMessage {...messages.accountHelpSettings} />
              </Link>
            ) : (
              <Link to="/sign-in">
                <FormattedMessage {...messages.accountHelpSignIn} />
              </Link>
            )}
          </Description>
          <Button
            form={seed(name)}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            <FormattedMessage {...messages.submit} />
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default RecoverForm
