import { MockedProvider } from '@apollo/react-testing'
import { storiesOf } from '@storybook/react'
import React from 'react'

import {
  emailBuilder,
  profileBuilder,
  userBuilder,
  userResponseBuilder,
} from 'utilities/specification'
import {
  currentUserQuery,
  signInMutation,
  signInTwoFactorAuthMutation,
} from './graphql'
import SignIn from '.'

const email = 'demo@fintruth.com'
const password = 'A!s2d3f4g5'
const token = '123456'
const userId = '02411db8-e5d3-4ca8-a7a7-bea9d0b6d4f3'

const user = userBuilder({
  id: userId,
  emails: [emailBuilder({ isPrimary: true, userId, value: email })],
  isTwoFactorAuthEnabled: false,
  profile: profileBuilder({ userId }),
})

const userResponse = userResponseBuilder({ user })

const defaultMocks = [
  {
    request: { query: signInMutation, variables: { email, password } },
    result: { data: { response: { ...userResponse, error: null } } },
  },
  { request: { query: currentUserQuery }, result: { data: { user } } },
]

const defaultTwoFactorAuthEnabledMocks = [
  {
    request: { query: signInMutation, variables: { email, password } },
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
  { request: { query: currentUserQuery }, result: { data: { user: null } } },
  {
    request: {
      query: signInTwoFactorAuthMutation,
      variables: { email, password, token },
    },
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
  { request: { query: currentUserQuery }, result: { data: { user } } },
]

const delayMocks = [
  {
    delay: 5000,
    request: { query: signInMutation, variables: { email, password } },
    result: { data: { response: { ...userResponse, error: null } } },
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
          ...userResponse,
          error: null,
          user: { ...userResponse.user, isTwoFactorAuthEnabled: true },
        },
      },
    },
  },
  { request: { query: currentUserQuery }, result: { data: { user: null } } },
  {
    delay: 5000,
    request: {
      query: signInTwoFactorAuthMutation,
      variables: { email, password, token },
    },
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
  { request: { query: currentUserQuery }, result: { data: { user } } },
]

const errorMocks = [
  {
    request: { query: signInMutation, variables: { email, password } },
    result: { data: { response: { ...userResponse, user: null } } },
  },
]

const errorTwoFactorAuthEnabledMocks = [
  {
    request: { query: signInMutation, variables: { email, password } },
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
  { request: { query: currentUserQuery }, result: { data: { user: null } } },
  {
    request: {
      query: signInTwoFactorAuthMutation,
      variables: { email, password, token },
    },
    result: { data: { response: { ...userResponse, user: null } } },
  },
]

storiesOf('Routes|Sign In', module)
  .add('Default', () => (
    <MockedProvider mocks={defaultMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('Default (2FA Enabled)', () => (
    <MockedProvider mocks={defaultTwoFactorAuthEnabledMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider mocks={delayMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('With Delay (2FA Enabled)', () => (
    <MockedProvider mocks={delayTwoFactorAuthEnabledMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider mocks={errorMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('With Error (2FA Enabled)', () => (
    <MockedProvider mocks={errorTwoFactorAuthEnabledMocks}>
      <SignIn />
    </MockedProvider>
  ))
