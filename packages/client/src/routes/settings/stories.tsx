import { MockedProvider } from '@apollo/react-testing'
import { storiesOf } from '@storybook/react'
import React from 'react'

import {
  emailBuilder,
  enableTwoFactorAuthResponseBuilder,
  profileBuilder,
  profileResponseBuilder,
  responseBuilder,
  userBuilder,
  userResponseBuilder,
} from 'utilities/specification'
import {
  confirmTwoFactorAuthMutation,
  currentUserQuery,
  disableTwoFactorAuthMutation,
  enableTwoFactorAuthMutation,
  updatePasswordMutation,
  updateProfileMutation,
} from './graphql'
import Settings from '.'

const familyName = 'User'
const givenName = 'Demo'
const newPassword = '!A2s3d4f5g'
const password = 'A!s2d3f4g5'
const token = '123456'
const userId = '02411db8-e5d3-4ca8-a7a7-bea9d0b6d4f3'

const enableTwoFactorAuthResponse = enableTwoFactorAuthResponseBuilder()

const response = responseBuilder()

const user = userBuilder({
  id: userId,
  emails: [emailBuilder({ isPrimary: true, userId })],
  isTwoFactorAuthEnabled: false,
  profile: profileBuilder({ userId }),
})

const profileResponse = profileResponseBuilder({
  profile: { ...user.profile, familyName, givenName },
})

const userResponse = userResponseBuilder({ user })

const defaultMocks = [
  { request: { query: currentUserQuery }, result: { data: { user } } },
  {
    request: {
      query: updatePasswordMutation,
      variables: { newPassword, newPasswordConfirm: newPassword, password },
    },
    result: { data: { response: { ...response, error: null } } },
  },
  {
    request: {
      query: updateProfileMutation,
      variables: { input: { familyName, givenName } },
    },
    result: { data: { response: { ...profileResponse, error: null } } },
  },
  {
    request: { query: enableTwoFactorAuthMutation },
    result: {
      data: { response: { ...enableTwoFactorAuthResponse, error: null } },
    },
  },
  {
    request: { query: confirmTwoFactorAuthMutation, variables: { token } },
    result: {
      data: {
        response: {
          ...userResponse,
          error: null,
          user: { ...userResponse.user, isTwoFactorAuthEnabled: true },
        },
      },
    },
  },
]

const defaultTwoFactorAuthEnabledMocks = [
  {
    request: { query: currentUserQuery },
    result: { data: { user: { ...user, isTwoFactorAuthEnabled: true } } },
  },
  {
    request: {
      query: updatePasswordMutation,
      variables: { newPassword, newPasswordConfirm: newPassword, password },
    },
    result: { data: { response: { ...response, error: null } } },
  },
  {
    request: {
      query: updateProfileMutation,
      variables: { input: { familyName, givenName } },
    },
    result: { data: { response: { ...profileResponse, error: null } } },
  },
  {
    request: { query: disableTwoFactorAuthMutation, variables: { token } },
    result: { data: { response: { ...userResponse, error: null } } },
  },
]

const delayMocks = [
  {
    delay: 5000,
    request: { query: currentUserQuery },
    result: { data: { user } },
  },
  {
    delay: 5000,
    request: {
      query: updatePasswordMutation,
      variables: { newPassword, newPasswordConfirm: newPassword, password },
    },
    result: { data: { response: { ...response, error: null } } },
  },
  {
    delay: 5000,
    request: {
      query: updateProfileMutation,
      variables: { input: { familyName, givenName } },
    },
    result: { data: { response: { ...profileResponse, error: null } } },
  },
  {
    delay: 5000,
    request: { query: enableTwoFactorAuthMutation },
    result: {
      data: { response: { ...enableTwoFactorAuthResponse, error: null } },
    },
  },
  {
    delay: 5000,
    request: { query: confirmTwoFactorAuthMutation, variables: { token } },
    result: {
      data: {
        response: {
          ...userResponse,
          error: null,
          user: { ...userResponse.user, isTwoFactorAuthEnabled: true },
        },
      },
    },
  },
]

const delayTwoFactorAuthEnabledMocks = [
  {
    delay: 5000,
    request: { query: currentUserQuery },
    result: { data: { user: { ...user, isTwoFactorAuthEnabled: true } } },
  },
  {
    delay: 5000,
    request: {
      query: updatePasswordMutation,
      variables: { newPassword, newPasswordConfirm: newPassword, password },
    },
    result: { data: { response: { ...response, error: null } } },
  },
  {
    delay: 5000,
    request: {
      query: updateProfileMutation,
      variables: { input: { familyName, givenName } },
    },
    result: { data: { response: { ...profileResponse, error: null } } },
  },
  {
    delay: 5000,
    request: { query: disableTwoFactorAuthMutation, variables: { token } },
    result: { data: { response: { ...userResponse, error: null } } },
  },
]

const errorMocks = [
  { request: { query: currentUserQuery }, result: { data: { user } } },
  {
    request: {
      query: updatePasswordMutation,
      variables: { newPassword, newPasswordConfirm: newPassword, password },
    },
    result: { data: { response } },
  },
  {
    request: {
      query: updateProfileMutation,
      variables: { input: { familyName, givenName } },
    },
    result: { data: { response: { ...profileResponse, profile: null } } },
  },
  {
    request: { query: enableTwoFactorAuthMutation },
    result: {
      data: {
        response: {
          ...enableTwoFactorAuthResponse,
          dataUrl: null,
          secret: null,
        },
      },
    },
  },
  {
    request: { query: enableTwoFactorAuthMutation },
    result: {
      data: { response: { ...enableTwoFactorAuthResponse, error: null } },
    },
  },
  {
    request: { query: confirmTwoFactorAuthMutation, variables: { token } },
    result: { data: { response: { ...userResponse, user: null } } },
  },
]

const errorTwoFactorAuthEnabledMocks = [
  {
    request: { query: currentUserQuery },
    result: { data: { user: { ...user, isTwoFactorAuthEnabled: true } } },
  },
  {
    request: {
      query: updatePasswordMutation,
      variables: { newPassword, newPasswordConfirm: newPassword, password },
    },
    result: { data: { response } },
  },
  {
    request: {
      query: updateProfileMutation,
      variables: { input: { familyName, givenName } },
    },
    result: { data: { response: { ...profileResponse, profile: null } } },
  },
  {
    request: { query: disableTwoFactorAuthMutation, variables: { token } },
    result: { data: { response: { ...userResponse, user: null } } },
  },
]

storiesOf('Routes|Settings', module)
  .add('Default', () => (
    <MockedProvider mocks={defaultMocks}>
      <Settings />
    </MockedProvider>
  ))
  .add('Default (2FA Enabled)', () => (
    <MockedProvider mocks={defaultTwoFactorAuthEnabledMocks}>
      <Settings />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider mocks={delayMocks}>
      <Settings />
    </MockedProvider>
  ))
  .add('With Delay (2FA Enabled)', () => (
    <MockedProvider mocks={delayTwoFactorAuthEnabledMocks}>
      <Settings />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider mocks={errorMocks}>
      <Settings />
    </MockedProvider>
  ))
  .add('With Error (2FA Enabled)', () => (
    <MockedProvider mocks={errorTwoFactorAuthEnabledMocks}>
      <Settings />
    </MockedProvider>
  ))
