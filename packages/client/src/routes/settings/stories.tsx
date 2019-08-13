import { MockedProvider } from '@apollo/react-testing'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { createFragmentMatcher, createInMemoryCache } from 'utils/apollo'
import {
  emailBuilder,
  enableTwoFactorAuthResponseBuilder,
  profileBuilder,
  responseBuilder,
  userBuilder,
} from 'utils/specification'
import {
  confirmTwoFactorAuthMutation,
  currentProfileQuery,
  currentUserQuery,
  disableTwoFactorAuthMutation,
  enableTwoFactorAuthMutation,
  shallowCurrentUserQuery,
  updatePasswordMutation,
  updateProfileMutation,
} from './graphql'
import Settings from '.'

const enableTwoFactorAuthResponse = enableTwoFactorAuthResponseBuilder()
const fragmentMatcher = createFragmentMatcher()
const response = responseBuilder()

const familyName = 'User'
const givenName = 'Demo'
const newPassword = '!A2s3d4f5g'
const password = 'A!s2d3f4g5'
const token = '123456'
const userId = '02411db8-e5d3-4ca8-a7a7-bea9d0b6d4f3'

const user = userBuilder({
  id: userId,
  emails: [emailBuilder({ isPrimary: true, userId })],
  isTwoFactorAuthEnabled: false,
  profile: profileBuilder({ userId }),
})

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
    result: { data: { response: { ...response, error: null } } },
  },
  {
    request: { query: currentProfileQuery },
    result: { data: { profile: { ...user.profile, familyName, givenName } } },
  },
  {
    request: { query: enableTwoFactorAuthMutation },
    result: {
      data: { response: { ...enableTwoFactorAuthResponse, error: null } },
    },
  },
  {
    request: { query: confirmTwoFactorAuthMutation, variables: { token } },
    result: { data: { response: { ...response, error: null } } },
  },
  {
    request: { query: shallowCurrentUserQuery },
    result: { data: { user: { ...user, isTwoFactorAuthEnabled: true } } },
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
    result: { data: { response: { ...response, error: null } } },
  },
  {
    request: { query: currentProfileQuery },
    result: { data: { profile: { ...user.profile, familyName, givenName } } },
  },
  {
    request: { query: disableTwoFactorAuthMutation, variables: { token } },
    result: { data: { response: { ...response, error: null } } },
  },
  { request: { query: shallowCurrentUserQuery }, result: { data: { user } } },
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
    result: { data: { response: { ...response, error: null } } },
  },
  {
    delay: 2000,
    request: { query: currentProfileQuery },
    result: { data: { profile: { ...user.profile, familyName, givenName } } },
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
    result: { data: { response: { ...response, error: null } } },
  },
  {
    delay: 2000,
    request: { query: shallowCurrentUserQuery },
    result: { data: { user: { ...user, isTwoFactorAuthEnabled: true } } },
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
    result: { data: { response: { ...response, error: null } } },
  },
  {
    delay: 2000,
    request: { query: currentProfileQuery },
    result: { data: { profile: { ...user.profile, familyName, givenName } } },
  },
  {
    delay: 5000,
    request: { query: disableTwoFactorAuthMutation, variables: { token } },
    result: { data: { response: { ...response, error: null } } },
  },
  {
    delay: 2000,
    request: { query: shallowCurrentUserQuery },
    result: { data: { user } },
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
    result: { data: { response } },
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
    result: { data: { response } },
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
    result: { data: { response } },
  },
  {
    request: { query: disableTwoFactorAuthMutation, variables: { token } },
    result: { data: { response } },
  },
]

storiesOf('Routes|Settings', module)
  .add('Default', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={defaultMocks}
    >
      <Settings />
    </MockedProvider>
  ))
  .add('Default (2FA Enabled)', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={defaultTwoFactorAuthEnabledMocks}
    >
      <Settings />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={delayMocks}
    >
      <Settings />
    </MockedProvider>
  ))
  .add('With Delay (2FA Enabled)', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={delayTwoFactorAuthEnabledMocks}
    >
      <Settings />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={errorMocks}
    >
      <Settings />
    </MockedProvider>
  ))
  .add('With Error (2FA Enabled)', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={errorTwoFactorAuthEnabledMocks}
    >
      <Settings />
    </MockedProvider>
  ))
