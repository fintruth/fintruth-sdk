import { MockedProvider } from '@apollo/react-testing'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { recoverMutation, recoverQuery } from './graphql'
import Recover from '.'

const defaultMocks = [
  { request: { query: recoverQuery }, result: { data: { user: null } } },
  {
    request: {
      query: recoverMutation,
      variables: { email: 'demo@fintruth.com' },
    },
    result: { data: { response: { error: null } } },
  },
]

const defaultAuthenticatedMocks = [
  {
    request: { query: recoverQuery },
    result: {
      data: {
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          emails: [
            {
              id: '5ec99e43-c24b-4104-a8d2-4b659109ae1f',
              value: 'demo@fintruth.com',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: recoverMutation,
      variables: { email: 'demo@fintruth.com' },
    },
    result: { data: { response: { error: null } } },
  },
]

const delayMocks = defaultMocks.map(defaultMock => ({
  ...defaultMock,
  delay: 5000,
}))

const delayAuthenticatedMocks = defaultAuthenticatedMocks.map(
  defaultAuthenticatedMock => ({
    ...defaultAuthenticatedMock,
    delay: 5000,
  })
)

const errorMocks = [
  { request: { query: recoverQuery }, result: { data: { user: null } } },
  {
    request: {
      query: recoverMutation,
      variables: { email: 'demo@fintruth.com' },
    },
    result: {
      data: { response: { error: { message: 'The user does not exist' } } },
    },
  },
]

const errorAuthenticatedMocks = [
  {
    request: { query: recoverQuery },
    result: {
      data: {
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          emails: [
            {
              id: '5ec99e43-c24b-4104-a8d2-4b659109ae1f',
              value: 'demo@fintruth.com',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: recoverMutation,
      variables: { email: 'demo@fintruth.com' },
    },
    result: {
      data: {
        response: {
          error: {
            message: 'An issue was encountered when sending the recovery email',
          },
        },
      },
    },
  },
]

storiesOf('Routes|Recover', module)
  .add('Default', () => (
    <MockedProvider addTypename={false} mocks={defaultMocks}>
      <Recover />
    </MockedProvider>
  ))
  .add('Default (Authenticated)', () => (
    <MockedProvider addTypename={false} mocks={defaultAuthenticatedMocks}>
      <Recover />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider addTypename={false} mocks={delayMocks}>
      <Recover />
    </MockedProvider>
  ))
  .add('With Delay (Authenticated)', () => (
    <MockedProvider addTypename={false} mocks={delayAuthenticatedMocks}>
      <Recover />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider addTypename={false} mocks={errorMocks}>
      <Recover />
    </MockedProvider>
  ))
  .add('With Error (Authenticated)', () => (
    <MockedProvider addTypename={false} mocks={errorAuthenticatedMocks}>
      <Recover />
    </MockedProvider>
  ))
