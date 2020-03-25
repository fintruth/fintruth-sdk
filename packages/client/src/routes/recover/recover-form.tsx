import { useMutation } from '@apollo/react-hooks'
import { Link as BaseLink } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage, defineMessages, useIntl } from 'react-intl'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components'

import BaseButton from 'components/button'
import Field, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { form, navigation } from 'i18n'
import { help, link } from 'styles/mixins'
import { hasResponseError } from 'utils/apollo'
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
  data?: QueriedUser
}

interface Values {
  email: string
}

const rootId = 'routes.recover.recoverForm'
const accountHelpId = `${rootId}.accountHelp`

const translations = {
  accountHelp: defineMessages({
    description: {
      id: `${accountHelpId}.description`,
      defaultMessage: 'Already have email and password?',
      description: 'The description in the Account Help section',
    },
  }),
}

const Help = styled.p.attrs((attrs) => ({ color: 'success', ...attrs }))<
  HelpProps
>`
  ${({ color, theme }) => help(theme[color])};
  margin-bottom: ${rem(30)};
  width: ${rem(280)};

  &:not(:first-child) {
    margin-top: ${rem(-10)};
  }
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
  data,
  id,
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const { formatMessage } = useIntl()
  const seed = useUIDSeed()
  const formId = id || seed('recover-form')

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    RecoverMutationData,
    RecoverMutationVariables
  >(recoverMutation, {
    onCompleted: ({ response }) =>
      setHelpProps(
        response.error
          ? { children: response.error.message, color: 'danger' }
          : { children: formatMessage(form.success.verificationEmail) }
      ),
  })

  return (
    <>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={{
          email: data
            ? (data.emails.find(({ isPrimary }) => isPrimary) || { value: '' })
                .value
            : '',
        }}
        onSubmit={(variables, { resetForm }) =>
          onSubmit({ variables }).then(({ data }) =>
            hasResponseError(data) ? undefined : resetForm()
          )
        }
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form id={formId} noValidate {...props}>
          <Field name="email">
            <FieldLabel>
              <FormattedMessage {...form.field.label.email} />
            </FieldLabel>
            <FieldInput form={formId} type="email" />
            <FieldHelp />
          </Field>
          <Description>
            <FormattedMessage {...translations.accountHelp.description} />{' '}
            {data ? (
              <Link to="/settings">
                <FormattedMessage {...navigation.route.settings} />
              </Link>
            ) : (
              <Link to="/sign-in">
                <FormattedMessage {...navigation.route.signIn} />
              </Link>
            )}
          </Description>
          <Button
            form={formId}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            <FormattedMessage {...form.submit.recover} />
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default RecoverForm
