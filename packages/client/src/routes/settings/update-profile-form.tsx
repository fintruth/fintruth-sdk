import { useMutation } from '@apollo/react-hooks'
import { Omit, User } from '@fintruth-sdk/common'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named
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
  UpdateProfileMutationData,
  UpdateProfileMutationVariables,
  accountQuery,
  updateProfileMutation,
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
  familyName: string
  givenName: string
}

const validationSchema = object().shape({
  familyName: string().required('This is a required field'),
  givenName: string().required('This is a required field'),
})

const formId = 'update-profile__Form'

const Help = styled.p<HelpProps>`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
`

const TextField = styled(BaseTextField)`
  ${field};
`

const Button = styled(BaseButton)`
  ${button};
`

const UpdateProfileForm: React.FunctionComponent<Props> = ({
  user,
  ...props
}: Props) => {
  const [helpColor, setHelpColor] = React.useState<Color>('success')
  const [helpContent, setHelpContent] = React.useState<string>()

  const [onSubmit, { loading }] = useMutation<
    UpdateProfileMutationData,
    UpdateProfileMutationVariables
  >(updateProfileMutation, {
    onCompleted: ({ response }) => {
      if (response.error) {
        setHelpColor('danger')
        setHelpContent(response.error.message)
      } else if (response.profile) {
        setHelpColor('success')
        setHelpContent('Your profile information was successfully updated')
      }
    },
    update: (cache, { data }) =>
      data &&
      data.response.profile &&
      cache.writeQuery({
        data: { user: { ...user, profile: data.response.profile } },
        query: accountQuery,
      }),
  })

  return (
    <React.Fragment>
      {helpContent && <Help color={helpColor}>{helpContent}</Help>}
      <Formik<Values>
        initialValues={{
          familyName: user.profile.familyName,
          givenName: user.profile.givenName,
        }}
        onSubmit={input => onSubmit({ variables: { input } })}
        validationSchema={validationSchema}
      >
        <Form {...props} id={formId} noValidate>
          <TextField name="givenName">
            <TextFieldLabel>FIRST NAME</TextFieldLabel>
            <TextFieldControl>
              <TextFieldInput autoComplete="given-name" form={formId} />
            </TextFieldControl>
            <TextFieldHelp />
          </TextField>
          <TextField name="familyName">
            <TextFieldLabel>LAST NAME</TextFieldLabel>
            <TextFieldControl>
              <TextFieldInput autoComplete="family-name" form={formId} />
            </TextFieldControl>
            <TextFieldHelp />
          </TextField>
          <Button
            form={formId}
            isLoading={loading}
            type="submit"
            variant="primary"
          >
            SAVE
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default UpdateProfileForm
