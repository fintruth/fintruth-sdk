import { MockedProvider } from '@apollo/react-testing'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { createInMemoryCache } from 'utils/apollo'
import { responseBuilder } from 'utils/spec'
import { registerMutation } from './graphql'
import Register from '.'

const response = responseBuilder()

const email = 'demo@fintruth.com'
const familyName = 'User'
const givenName = 'Demo'
const password = 'A!s2d3f4g5'

const defaultMocks = [
  {
    request: {
      query: registerMutation,
      variables: {
        input: { email, password, profile: { familyName, givenName } },
      },
    },
    result: { data: { response: { ...response, error: null } } },
  },
]

const delayMocks = [
  {
    delay: 5000,
    request: {
      query: registerMutation,
      variables: {
        input: { email, password, profile: { familyName, givenName } },
      },
    },
    result: { data: { response: { ...response, error: null } } },
  },
]

const errorMocks = [
  {
    request: {
      query: registerMutation,
      variables: {
        input: { email, password, profile: { familyName, givenName } },
      },
    },
    result: { data: { response } },
  },
]

storiesOf('Routes|Register', module)
  .add('Default', () => (
    <MockedProvider cache={createInMemoryCache()} mocks={defaultMocks}>
      <Register />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider cache={createInMemoryCache()} mocks={delayMocks}>
      <Register />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider cache={createInMemoryCache()} mocks={errorMocks}>
      <Register />
    </MockedProvider>
  ))
