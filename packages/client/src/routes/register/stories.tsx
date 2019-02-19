import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { storiesOf } from '@storybook/react'

import { registerMutation } from './graphql'
import Register from '.'

const defaultMocks = new Array(5).fill({
  request: {
    query: registerMutation,
    variables: {
      input: {
        email: 'demo@fintruth.com',
        emailConfirm: 'demo@fintruth.com',
        firstName: 'Demo',
        lastName: 'User',
        password: 'Asdfg!2345',
      },
    },
  },
  result: { data: { response: { error: null } } },
})

const delayMocks = new Array(5).fill({
  delay: 5000,
  request: {
    query: registerMutation,
    variables: {
      input: {
        email: 'demo@fintruth.com',
        emailConfirm: 'demo@fintruth.com',
        firstName: 'Demo',
        lastName: 'User',
        password: 'Asdfg!2345',
      },
    },
  },
  result: { data: { response: { error: null } } },
})

const errorMocks = new Array(5).fill({
  request: {
    query: registerMutation,
    variables: {
      input: {
        email: 'demo@fintruth.com',
        emailConfirm: 'demo@fintruth.com',
        firstName: 'Demo',
        lastName: 'User',
        password: 'Asdfg!2345',
      },
    },
  },
  result: {
    data: { response: { error: { message: 'The user already exists' } } },
  },
})

storiesOf('Routes|Register', module)
  .add('Default', () => (
    <MockedProvider addTypename={false} mocks={defaultMocks}>
      <Register />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider addTypename={false} mocks={delayMocks}>
      <Register />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider addTypename={false} mocks={errorMocks}>
      <Register />
    </MockedProvider>
  ))
