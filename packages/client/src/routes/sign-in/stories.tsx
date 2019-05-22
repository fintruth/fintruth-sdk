import { storiesOf } from '@storybook/react'
import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'

import { signInFormMutation, signInTwoFactorAuthFormMutation } from './graphql'
import SignIn from '.'

const defaultMocks = [
  {
    request: {
      query: signInFormMutation,
      variables: { email: 'demo@fintruth.com', password: 'Asdfg!2345' },
    },
    result: {
      data: {
        response: {
          error: null,
          user: {
            id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
            email: 'demo@fintruth.com',
            isTwoFactorAuthEnabled: false,
          },
        },
      },
    },
  },
]

const defaultTwoFactorAuthEnabledMocks = [
  {
    request: {
      query: signInFormMutation,
      variables: { email: 'demo@fintruth.com', password: 'Asdfg!2345' },
    },
    result: {
      data: {
        response: {
          error: null,
          user: {
            id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
            email: 'demo@fintruth.com',
            isTwoFactorAuthEnabled: true,
          },
        },
      },
    },
  },
  {
    request: {
      query: signInTwoFactorAuthFormMutation,
      variables: {
        email: 'demo@fintruth.com',
        password: 'Asdfg!2345',
        token: '123456',
      },
    },
    result: {
      data: {
        response: {
          error: null,
          user: {
            id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
            email: 'demo@fintruth.com',
            isTwoFactorAuthEnabled: true,
          },
        },
      },
    },
  },
]

const delayMocks = defaultMocks.map(defaultMock => ({
  ...defaultMock,
  delay: 5000,
}))

const delayTwoFactorAuthEnabledMocks = defaultTwoFactorAuthEnabledMocks.map(
  defaultTwoFactorAuthEnabledMock => ({
    ...defaultTwoFactorAuthEnabledMock,
    delay: 5000,
  })
)

const errorMocks = [
  {
    request: {
      query: signInFormMutation,
      variables: { email: 'demo@fintruth.com', password: 'Asdfg!2345' },
    },
    result: {
      data: {
        response: {
          error: { message: 'Incorrect email or password' },
          user: null,
        },
      },
    },
  },
]

const errorTwoFactorAuthEnabledMocks = [
  {
    request: {
      query: signInFormMutation,
      variables: { email: 'demo@fintruth.com', password: 'Asdfg!2345' },
    },
    result: {
      data: {
        response: {
          error: null,
          user: {
            id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
            email: 'demo@fintruth.com',
            isTwoFactorAuthEnabled: true,
          },
        },
      },
    },
  },
  {
    request: {
      query: signInTwoFactorAuthFormMutation,
      variables: {
        email: 'demo@fintruth.com',
        password: 'Asdfg!2345',
        token: '123456',
      },
    },
    result: {
      data: {
        response: {
          error: { message: 'Incorrect verification code' },
          user: null,
        },
      },
    },
  },
]

storiesOf('Routes|Sign In', module)
  .add('Default', () => (
    <MockedProvider addTypename={false} mocks={defaultMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('Default (2FA Enabled)', () => (
    <MockedProvider
      addTypename={false}
      mocks={defaultTwoFactorAuthEnabledMocks}
    >
      <SignIn />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider addTypename={false} mocks={delayMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('With Delay (2FA Enabled)', () => (
    <MockedProvider addTypename={false} mocks={delayTwoFactorAuthEnabledMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider addTypename={false} mocks={errorMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('With Error (2FA Enabled)', () => (
    <MockedProvider addTypename={false} mocks={errorTwoFactorAuthEnabledMocks}>
      <SignIn />
    </MockedProvider>
  ))
