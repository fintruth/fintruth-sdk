import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { storiesOf } from '@storybook/react'

import { recoverMutation } from './graphql'
import Recover from '.'

const defaultMocks = [
  {
    request: {
      query: recoverMutation,
      variables: { email: 'demo@fintruth.com' },
    },
    result: { data: { response: { error: null } } },
  },
]

const delayMocks = [
  {
    delay: 5000,
    request: {
      query: recoverMutation,
      variables: { email: 'demo@fintruth.com' },
    },
    result: { data: { response: { error: null } } },
  },
]

const errorMocks = [
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

storiesOf('Routes|Recover', module)
  .add('Default', () => (
    <MockedProvider addTypename={false} mocks={defaultMocks}>
      <Recover />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider addTypename={false} mocks={delayMocks}>
      <Recover />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider addTypename={false} mocks={errorMocks}>
      <Recover />
    </MockedProvider>
  ))
