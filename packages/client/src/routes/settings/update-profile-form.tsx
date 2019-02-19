import React from 'react'
import styled from 'styled-components'
import { Form as BaseForm, Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { User } from '@fintruth-sdk/shared'
import { object, string } from 'yup'

import BaseButton from 'components/button'
import BaseNotice from 'components/notice'
import ControlledInputField from 'components/controlled-input-field'
import { renderLoadingIf } from 'utilities/loading'
import {
  UpdateProfileMutationData,
  UpdateProfileMutationVariables,
  accountQuery,
  updateProfileMutation,
} from './graphql'
import { button, fieldContainer, form, notice } from './mixins'

interface Props {
  user?: User
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

const FieldContainer = styled.div`
  ${fieldContainer}
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
  ...rest
}: Props) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Mutation<UpdateProfileMutationData, UpdateProfileMutationVariables>
      mutation={updateProfileMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setNotice(response.error.message)
          setStatus('failure')
        } else if (response.profile) {
          setNotice('Your profile information was successfully updated')
          setStatus('success')
        }
      }}
      update={(cache, { data = { response: { profile: null } } }) =>
        user && data.response.profile
          ? cache.writeQuery({
              data: { user: { ...user, profile: data.response.profile } },
              query: accountQuery,
            })
          : undefined
      }
    >
      {(onSubmit, { loading }) =>
        renderLoadingIf(loading, () => (
          <Formik<Values>
            initialValues={{
              firstName: user && user.profile ? user.profile.firstName : '',
              lastName: user && user.profile ? user.profile.lastName : '',
            }}
            onSubmit={input => onSubmit({ variables: { input } })}
            validationSchema={validationSchema}
          >
            {() => (
              <React.Fragment>
                {notice && <Notice status={status}>{notice}</Notice>}
                <Form {...rest} id={formId} noValidate>
                  <FieldContainer>
                    <ControlledInputField
                      id={`${formId}-firstName`}
                      autoComplete="given-name"
                      form={formId}
                      name="firstName"
                      placeholder="First Name"
                      type="text"
                    />
                    <ControlledInputField
                      id={`${formId}-lastName`}
                      autoComplete="family-name"
                      form={formId}
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                    />
                  </FieldContainer>
                  <Button form={formId} status="primary" type="submit">
                    SAVE
                  </Button>
                </Form>
              </React.Fragment>
            )}
          </Formik>
        ))
      }
    </Mutation>
  )
}

export default UpdateProfileForm
