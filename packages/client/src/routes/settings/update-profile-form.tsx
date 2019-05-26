import { User } from '@fintruth-sdk/shared'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { Mutation } from 'react-apollo'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named
import { object, string } from 'yup'

import BaseButton from 'components/button'
import BaseInput from 'components/input'
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

interface Props {
  user: User
}

interface Values {
  familyName: string
  givenName: string
}

const Help = styled.p<HelpProps>`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
`

const Input = styled(BaseInput)`
  ${field};
`

const Button = styled(BaseButton)`
  ${button};
`

const validationSchema = object().shape({
  familyName: string().required('This is a required field'),
  givenName: string().required('This is a required field'),
})

const formId = 'update-profile__Form'

const UpdateProfileForm: React.FunctionComponent<Props> = ({
  user,
  ...props
}: Props) => {
  const [helpColor, setHelpColor] = React.useState<Color>('success')
  const [helpContent, setHelpContent] = React.useState<string>()

  return (
    <Mutation<UpdateProfileMutationData, UpdateProfileMutationVariables>
      mutation={updateProfileMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setHelpColor('danger')
          setHelpContent(response.error.message)
        } else if (response.profile) {
          setHelpColor('success')
          setHelpContent('Your profile information was successfully updated')
        }
      }}
      update={(cache, { data = { response: { profile: null } } }) =>
        data.response.profile
          ? cache.writeQuery({
              data: { user: { ...user, profile: data.response.profile } },
              query: accountQuery,
            })
          : undefined
      }
    >
      {(onSubmit, { loading }) => (
        <Formik<Values>
          initialValues={{
            familyName: user.profile.familyName,
            givenName: user.profile.givenName,
          }}
          onSubmit={input => onSubmit({ variables: { input } })}
          validationSchema={validationSchema}
        >
          <React.Fragment>
            {helpContent && <Help color={helpColor}>{helpContent}</Help>}
            <Form {...props} id={formId} noValidate>
              <Input
                id={`${formId}-givenName`}
                autoComplete="given-name"
                form={formId}
                label="FIRST NAME"
                name="givenName"
                type="text"
              />
              <Input
                id={`${formId}-familyName`}
                autoComplete="family-name"
                form={formId}
                label="LAST NAME"
                name="familyName"
                type="text"
              />
              <Button
                form={formId}
                isLoading={loading}
                type="submit"
                variant="primary"
              >
                SAVE
              </Button>
            </Form>
          </React.Fragment>
        </Formik>
      )}
    </Mutation>
  )
}

export default UpdateProfileForm
