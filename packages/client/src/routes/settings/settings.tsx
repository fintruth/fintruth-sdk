import React from 'react'
import styled, { css } from 'styled-components'
import { Form as BaseForm, Formik } from 'formik'
import { Link as BaseLink, RouteComponentProps } from '@reach/router'
import { Mutation, Query } from 'react-apollo'
import { Profile, User } from '@fintruth-sdk/shared'
import { object, ref, string } from 'yup'
import { pathOr } from 'ramda'
import { rem } from 'polished'

import BaseButton from 'components/button'
import BaseNotice from 'components/notice'
import ControlledInputField from 'components/controlled-input-field'
import Layout from 'components/layout'
import { content, fill, link, untilMedium } from 'styles/mixins'
import { renderLoadingIf } from 'utilities/loading'
import {
  accountQuery,
  updateEmailMutation,
  updatePasswordMutation,
  updateProfileMutation,
} from './graphql'

interface AccountQueryData {
  user?: User
}

interface FormProps {
  user?: User
}

interface UpdateEmailFormValues {
  email: string
  password: string
}

interface UpdateEmailMutationData {
  response: UpdateEmailMutationResponse
}

interface UpdateEmailMutationResponse {
  error?: any
  user?: User
}

interface UpdateEmailMutationVariables {
  email: string
  password: string
}

interface UpdatePasswordFormValues {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

interface UpdatePasswordMutationData {
  response: UpdatePasswordMutationResponse
}

interface UpdatePasswordMutationResponse {
  error?: any
}

interface UpdatePasswordMutationVariables {
  currentPassword: string
  newPassword: string
}

interface UpdateProfileFormValues {
  firstName: string
  lastName: string
}

interface UpdateProfileMutationData {
  response: UpdateProfileMutationResponse
}

interface UpdateProfileMutationResponse {
  error?: any
  profile?: Profile
}

interface UpdateProfileMutationVariables {
  input: UpdateProfileFormValues
}

const Root = styled.div`
  ${content};
  ${fill}
  flex-direction: column;

  padding: ${rem(40)} 0;

  ${untilMedium(css`
    padding: ${rem(40)} ${rem(20)};
  `)};
`

const Header = styled.h2`
  font-size: ${rem(18)};
  font-weight: 700;
  margin: 0 0 ${rem(20)} 0;
`

const Notice = styled(BaseNotice)`
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  display: flex;
  flex-direction: column;
`

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${rem(280)};
`

const Link = styled(BaseLink)`
  ${link};
  margin-top: ${rem(16)};
`

const Button = styled(BaseButton)`
  align-self: flex-end;
  margin-top: ${rem(40)};
`

const initialUpdatePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
}

const updateEmailFormValidationSchema = object().shape({
  email: string()
    .required('This is a required field')
    .email('Please provide a valid email address'),
  password: string().required('This is a required field'),
})

const updatePasswordFormValidationSchema = object().shape({
  currentPassword: string().required('This is a required field'),
  newPassword: string()
    .required('This is a required field')
    .min(10, 'Minimum length is ${min} characters'), // eslint-disable-line no-template-curly-in-string
  newPasswordConfirm: string()
    .required('This is a required field')
    .oneOf([ref('newPassword')], 'Please retype the new password'),
})

const updateProfileFormValidationSchema = object().shape({
  firstName: string().required('This is a required field'),
  lastName: string().required('This is a required field'),
})

const updateEmailFormId = 'update-email__Form'
const updatePasswordFormId = 'update-password__Form'
const updateProfileFormId = 'update-profile__Form'

const UpdateEmailForm: React.FunctionComponent<FormProps> = ({
  user,
}: FormProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Mutation<UpdateEmailMutationData, UpdateEmailMutationVariables>
      mutation={updateEmailMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setNotice(response.error.message)
          setStatus('failure')
        } else {
          setNotice('Your email address was successfully updated')
          setStatus('success')
        }
      }}
      update={(cache, { data = { response: { user: null } } }) =>
        cache.writeQuery({ data: data.response, query: accountQuery })
      }
    >
      {(onSubmit, { loading }) =>
        renderLoadingIf(loading, () => (
          <Formik<UpdateEmailFormValues>
            initialValues={{ email: pathOr('', ['email'], user), password: '' }}
            onSubmit={variables => onSubmit({ variables })}
            validationSchema={updateEmailFormValidationSchema}
          >
            {() => (
              <React.Fragment>
                {notice && <Notice status={status}>{notice}</Notice>}
                <Form id={updateEmailFormId} noValidate>
                  <FieldContainer>
                    <ControlledInputField
                      id={`${updateEmailFormId}-email`}
                      autoComplete="off"
                      form={updateEmailFormId}
                      name="email"
                      placeholder="Email"
                      type="email"
                    />
                    <ControlledInputField
                      id={`${updateEmailFormId}-password`}
                      autoComplete="off"
                      form={updateEmailFormId}
                      name="password"
                      placeholder="Password"
                      type="password"
                    />
                  </FieldContainer>
                  <Button
                    form={updateEmailFormId}
                    status="primary"
                    type="submit"
                  >
                    UPDATE EMAIL
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

const UpdatePasswordForm: React.FunctionComponent = () => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Mutation<UpdatePasswordMutationData, UpdatePasswordMutationVariables>
      mutation={updatePasswordMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setNotice(response.error.message)
          setStatus('failure')
        } else {
          setNotice('Your password was successfully updated')
          setStatus('success')
        }
      }}
    >
      {(onSubmit, { loading }) =>
        renderLoadingIf(loading, () => (
          <Formik<UpdatePasswordFormValues>
            initialValues={initialUpdatePasswordFormValues}
            onSubmit={variables => onSubmit({ variables })}
            validationSchema={updatePasswordFormValidationSchema}
          >
            {() => (
              <React.Fragment>
                {notice && <Notice status={status}>{notice}</Notice>}
                <Form id={updatePasswordFormId} noValidate>
                  <FieldContainer>
                    <ControlledInputField
                      id={`${updatePasswordFormId}-currentPassword`}
                      autoComplete="off"
                      form={updatePasswordFormId}
                      name="currentPassword"
                      placeholder="Current Password"
                      type="password"
                    />
                    <ControlledInputField
                      id={`${updatePasswordFormId}-newPassword`}
                      autoComplete="off"
                      form={updatePasswordFormId}
                      name="newPassword"
                      placeholder="New Password"
                      type="password"
                    />
                    <ControlledInputField
                      id={`${updatePasswordFormId}-newPasswordConfirm`}
                      autoComplete="off"
                      form={updatePasswordFormId}
                      name="newPasswordConfirm"
                      placeholder="Confirm New Password"
                      type="password"
                    />
                    <Link to="/recover">Forgot your password?</Link>
                  </FieldContainer>
                  <Button
                    form={updatePasswordFormId}
                    status="primary"
                    type="submit"
                  >
                    UPDATE PASSWORD
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

const UpdateProfileForm: React.FunctionComponent<FormProps> = ({
  user,
}: FormProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Mutation<UpdateProfileMutationData, UpdateProfileMutationVariables>
      mutation={updateProfileMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setNotice(response.error.message)
          setStatus('failure')
        } else {
          setNotice('Your profile information was successfully updated')
          setStatus('success')
        }
      }}
      update={(cache, { data = { response: { profile: null } } }) =>
        cache.writeQuery({
          data: {
            user: user ? { ...user, profile: data.response.profile } : null,
          },
          query: accountQuery,
        })
      }
    >
      {(onSubmit, { loading }) =>
        renderLoadingIf(loading, () => (
          <Formik<UpdateProfileFormValues>
            initialValues={{
              firstName: pathOr('', ['profile', 'firstName'], user),
              lastName: pathOr('', ['profile', 'lastName'], user),
            }}
            onSubmit={input => onSubmit({ variables: { input } })}
            validationSchema={updateProfileFormValidationSchema}
          >
            {() => (
              <React.Fragment>
                {notice && <Notice status={status}>{notice}</Notice>}
                <Form id={updateProfileFormId} noValidate>
                  <FieldContainer>
                    <ControlledInputField
                      id={`${updateProfileFormId}-firstName`}
                      autoComplete="given-name"
                      form={updateProfileFormId}
                      name="firstName"
                      placeholder="First Name"
                      type="text"
                    />
                    <ControlledInputField
                      id={`${updateProfileFormId}-lastName`}
                      autoComplete="family-name"
                      form={updateProfileFormId}
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                    />
                  </FieldContainer>
                  <Button
                    form={updateProfileFormId}
                    status="primary"
                    type="submit"
                  >
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

const Settings: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => (
  <Layout {...rest}>
    <Root>
      <Query<AccountQueryData> query={accountQuery}>
        {({ data = {}, loading }) =>
          renderLoadingIf(loading, () => (
            <React.Fragment>
              <Header>EMAIL</Header>
              <UpdateEmailForm user={data.user} />
              <hr />
              <Header>PASSWORD</Header>
              <UpdatePasswordForm />
              <hr />
              <Header>PROFILE INFORMATION</Header>
              <UpdateProfileForm user={data.user} />
            </React.Fragment>
          ))
        }
      </Query>
    </Root>
  </Layout>
)

export default Settings
