import { MockedProvider } from '@apollo/react-testing'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { createFragmentMatcher, createInMemoryCache } from 'utils/apollo'
import {
  emailBuilder,
  profileBuilder,
  responseBuilder,
  userBuilder,
} from 'utils/specification'
import { currentUserQuery, recoverMutation } from './graphql'
import Recover from '.'

const fragmentMatcher = createFragmentMatcher()
const response = responseBuilder()

const email = 'demo@fintruth.com'
const userId = '02411db8-e5d3-4ca8-a7a7-bea9d0b6d4f3'

const user = userBuilder({
  id: userId,
  emails: [emailBuilder({ isPrimary: true, userId, value: email })],
  profile: profileBuilder({ userId }),
})

const defaultMocks = [
  { request: { query: currentUserQuery }, result: { data: { user: null } } },
  {
    request: { query: recoverMutation, variables: { email } },
    result: { data: { response: { ...response, error: null } } },
  },
]

const defaultAuthenticatedMocks = [
  { request: { query: currentUserQuery }, result: { data: { user } } },
  {
    request: { query: recoverMutation, variables: { email } },
    result: { data: { response: { ...response, error: null } } },
  },
]

const delayMocks = [
  {
    delay: 5000,
    request: { query: currentUserQuery },
    result: { data: { user: null } },
  },
  {
    delay: 5000,
    request: { query: recoverMutation, variables: { email } },
    result: { data: { response: { ...response, error: null } } },
  },
]

const delayAuthenticatedMocks = [
  {
    delay: 5000,
    request: { query: currentUserQuery },
    result: { data: { user } },
  },
  {
    delay: 5000,
    request: { query: recoverMutation, variables: { email } },
    result: { data: { response: { ...response, error: null } } },
  },
]

const errorMocks = [
  { request: { query: currentUserQuery }, result: { data: { user: null } } },
  {
    request: { query: recoverMutation, variables: { email } },
    result: { data: { response } },
  },
]

const errorAuthenticatedMocks = [
  { request: { query: currentUserQuery }, result: { data: { user } } },
  {
    request: { query: recoverMutation, variables: { email } },
    result: { data: { response } },
  },
]

storiesOf('Routes|Recover', module)
  .add('Default', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={defaultMocks}
    >
      <Recover />
    </MockedProvider>
  ))
  .add('Default (Authenticated)', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={defaultAuthenticatedMocks}
    >
      <Recover />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={delayMocks}
    >
      <Recover />
    </MockedProvider>
  ))
  .add('With Delay (Authenticated)', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={delayAuthenticatedMocks}
    >
      <Recover />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={errorMocks}
    >
      <Recover />
    </MockedProvider>
  ))
  .add('With Error (Authenticated)', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={errorAuthenticatedMocks}
    >
      <Recover />
    </MockedProvider>
  ))
