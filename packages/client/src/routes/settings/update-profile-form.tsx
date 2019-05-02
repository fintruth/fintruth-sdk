import React from 'react'
import styled, { NoticeVariant } from 'styled-components' // eslint-disable-line import/named
import { Form as BaseForm, Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { User } from '@fintruth-sdk/shared'
import { object, string } from 'yup'

import BaseButton from 'components/button'
import BaseInput from 'components/input'
import BaseNotice from 'components/notice'
import {
  UpdateProfileMutationData,
  UpdateProfileMutationVariables,
  accountQuery,
  updateProfileMutation,
} from './graphql'
import { button, field, form, notice } from './mixins'

interface Props {
  user: User
}

interface Values {
  firstName: string
  lastName: string
}

const Notice = styled(BaseNotice)`
  ${notice}
`

const Form = styled(BaseForm)`
  ${form}
`

const Input = styled(BaseInput)`
  ${field}
`

const Button = styled(BaseButton)`
  ${button}
`

const validationSchema = object().shape({
  firstName: string().required('This is a required field'),
  lastName: string().required('This is a required field'),
})

const formId = 'update-profile__Form'

const UpdateProfileForm: React.FunctionComponent<Props> = ({
  user,
  ...props
}: Props) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [variant, setVariant] = React.useState<NoticeVariant>('success')

  return (
    <Mutation<UpdateProfileMutationData, UpdateProfileMutationVariables>
      mutation={updateProfileMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setNotice(response.error.message)
          setVariant('danger')
        } else if (response.profile) {
          setNotice('Your profile information was successfully updated')
          setVariant('success')
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
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
          }}
          onSubmit={input => onSubmit({ variables: { input } })}
          validationSchema={validationSchema}
        >
          <React.Fragment>
            {notice && <Notice variant={variant}>{notice}</Notice>}
            <Form {...props} id={formId} noValidate>
              <Input
                id={`${formId}-firstName`}
                autoComplete="given-name"
                form={formId}
                label="FIRST NAME"
                name="firstName"
                type="text"
              />
              <Input
                id={`${formId}-lastName`}
                autoComplete="family-name"
                form={formId}
                label="LAST NAME"
                name="lastName"
                type="text"
              />
              <Button
                form={formId}
                isLoading={loading}
                status="primary"
                type="submit"
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
