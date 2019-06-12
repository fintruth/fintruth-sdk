import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Omit } from '@fintruth-sdk/common'
import { Form, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named
import { object, ref, string } from 'yup'

import BaseButton from 'components/button'
import TextField, {
  TextFieldControl,
  TextFieldHelp,
  TextFieldInput,
  TextFieldLabel,
} from 'components/text-field'
import { help } from 'styles/mixins'
import { toRegisterInput } from 'utilities/graphql'
import {
  RegisterMutationData,
  RegisterMutationVariables,
  registerMutation,
} from './graphql'

type Props = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onReset' | 'onSubmit'
>

interface HelpProps {
  color: Color
}

interface ProfileValues {
  familyName: string
  givenName: string
}

interface Values {
  email: string
  emailConfirm: string
  password: string
  profile: ProfileValues
}

const initialValues: Values = {
  email: '',
  emailConfirm: '',
  password: '',
  profile: {
    familyName: '',
    givenName: '',
  },
}

const validationSchema = object().shape({
  email: string()
    .required('This is a required field')
    .email('Please provide a valid email address'),
  emailConfirm: string()
    .required('This is a required field')
    .oneOf([ref('email')], 'Please retype the email address'),
  password: string()
    .required('This is a required field')
    .min(10, 'Minimum length is ${min} characters'), // eslint-disable-line no-template-curly-in-string
  profile: object().shape({
    familyName: string().required('This is a required field'),
    givenName: string().required('This is a required field'),
  }),
})

const formId = 'register__Form'

const Help = styled.p<HelpProps>`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
`

const LastTextField = styled(TextField)`
  &:not(:last-child) {
    margin-bottom: ${rem(40)};
  }
`

const Button = styled(BaseButton)`
  display: block;
  margin: 0 auto;
`

const RegisterForm: React.FunctionComponent<Props> = ({ ...props }: Props) => {
  const [helpColor, setHelpColor] = React.useState<Color>('success')
  const [helpContent, setHelpContent] = React.useState<string>()
  const client = useApolloClient()

  const [onSubmit, { loading }] = useMutation<
    RegisterMutationData,
    RegisterMutationVariables
  >(registerMutation, {
    onCompleted: ({ response }) => {
      // NOTE: Due to the inability to invalidate Apollo's cache the
      // entire store needs to be reset in order to prevent storing
      // private data
      client.resetStore()

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
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) =>
          onSubmit({ variables: { input: toRegisterInput(values) } }).then(
            value =>
              path(['data', 'response', 'error'], value)
                ? undefined
                : resetForm()
          )
        }
        validationSchema={validationSchema}
      >
        <Form {...props} id={formId} noValidate>
          <TextField name="profile.givenName">
            <TextFieldLabel>FIRST NAME</TextFieldLabel>
            <TextFieldControl>
              <TextFieldInput autoComplete="given-name" form={formId} />
            </TextFieldControl>
            <TextFieldHelp />
          </TextField>
          <TextField name="profile.familyName">
            <TextFieldLabel>LAST NAME</TextFieldLabel>
            <TextFieldControl>
              <TextFieldInput autoComplete="family-name" form={formId} />
            </TextFieldControl>
            <TextFieldHelp />
          </TextField>
          <TextField name="email">
            <TextFieldLabel>EMAIL</TextFieldLabel>
            <TextFieldControl>
              <TextFieldInput form={formId} type="email" />
            </TextFieldControl>
            <TextFieldHelp />
          </TextField>
          <TextField name="emailConfirm">
            <TextFieldLabel>CONFIRM EMAIL</TextFieldLabel>
            <TextFieldControl>
              <TextFieldInput form={formId} type="email" />
            </TextFieldControl>
            <TextFieldHelp />
          </TextField>
          <LastTextField name="password">
            <TextFieldLabel>PASSWORD</TextFieldLabel>
            <TextFieldControl>
              <TextFieldInput form={formId} type="password" />
            </TextFieldControl>
            <TextFieldHelp />
          </LastTextField>
          <Button
            form={formId}
            isLoading={loading}
            type="submit"
            variant="primary"
          >
            REGISTER
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default RegisterForm
