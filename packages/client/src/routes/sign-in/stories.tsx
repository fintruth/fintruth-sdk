import { MockedProvider } from '@apollo/react-testing'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { createFragmentMatcher, createInMemoryCache } from 'utilities/apollo'
import {
  emailBuilder,
  profileBuilder,
  responseBuilder,
  signInResponseBuilder,
  userBuilder,
} from 'utilities/specification'
import {
  currentUserQuery,
  signInMutation,
  signInTwoFactorAuthMutation,
} from './graphql'
import SignIn from '.'

const fragmentMatcher = createFragmentMatcher()
const response = responseBuilder()

const email = 'demo@fintruth.com'
const isTwoFactorAuthEnabled = false
const password = 'A!s2d3f4g5'
const token = '123456'
const userId = '02411db8-e5d3-4ca8-a7a7-bea9d0b6d4f3'

const signInResponse = signInResponseBuilder({ isTwoFactorAuthEnabled })

const user = userBuilder({
  id: userId,
  emails: [emailBuilder({ isPrimary: true, userId, value: email })],
  isTwoFactorAuthEnabled,
  profile: profileBuilder({ userId }),
})

const defaultMocks = [
  {
    request: { query: signInMutation, variables: { email, password } },
    result: { data: { response: { ...signInResponse, error: null } } },
  },
  { request: { query: currentUserQuery }, result: { data: { user } } },
]

const defaultTwoFactorAuthEnabledMocks = [
  {
    request: { query: signInMutation, variables: { email, password } },
    result: {
      data: {
        response: {
          ...signInResponse,
          error: null,
          isTwoFactorAuthEnabled: true,
        },
      },
    },
  },
  {
    request: {
      query: signInTwoFactorAuthMutation,
      variables: { email, password, token },
    },
    result: { data: { response: { ...response, error: null } } },
  },
  { request: { query: currentUserQuery }, result: { data: { user } } },
]

const delayMocks = [
  {
    delay: 5000,
    request: { query: signInMutation, variables: { email, password } },
    result: { data: { response: { ...signInResponse, error: null } } },
  },
  { request: { query: currentUserQuery }, result: { data: { user } } },
]

const delayTwoFactorAuthEnabledMocks = [
  {
    delay: 5000,
    request: { query: signInMutation, variables: { email, password } },
    result: {
      data: {
        response: {
          ...signInResponse,
          error: null,
          isTwoFactorAuthEnabled: true,
        },
      },
    },
  },
  {
    delay: 5000,
    request: {
      query: signInTwoFactorAuthMutation,
      variables: { email, password, token },
    },
    result: { data: { response: { ...response, error: null } } },
  },
  { request: { query: currentUserQuery }, result: { data: { user } } },
]

const errorMocks = [
  {
    request: { query: signInMutation, variables: { email, password } },
    result: { data: { response: signInResponse } },
  },
]

const errorTwoFactorAuthEnabledMocks = [
  {
    request: { query: signInMutation, variables: { email, password } },
    result: {
      data: {
        response: {
          ...signInResponse,
          error: null,
          isTwoFactorAuthEnabled: true,
        },
      },
    },
  },
  {
    request: {
      query: signInTwoFactorAuthMutation,
      variables: { email, password, token },
    },
    result: { data: { response } },
  },
]

storiesOf('Routes|Sign In', module)
  .add('Default', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={defaultMocks}
    >
      <SignIn />
    </MockedProvider>
  ))
  .add('Default (2FA Enabled)', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={defaultTwoFactorAuthEnabledMocks}
    >
      <SignIn />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={delayMocks}
    >
      <SignIn />
    </MockedProvider>
  ))
  .add('With Delay (2FA Enabled)', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={delayTwoFactorAuthEnabledMocks}
    >
      <SignIn />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={errorMocks}
    >
      <SignIn />
    </MockedProvider>
  ))
  .add('With Error (2FA Enabled)', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={errorTwoFactorAuthEnabledMocks}
    >
      <SignIn />
    </MockedProvider>
  ))
