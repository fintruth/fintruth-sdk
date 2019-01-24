import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { MockedResponse } from 'react-apollo/test-links'
import { storiesOf } from '@storybook/react'
import Recover from '.'
import { recoverMutation } from './graphql'

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: recoverMutation,
      variables: { input: { email: 'logan.smith@gmail.com' } },
    },
    result: { data: { payload: { error: null } } },
  },
  {
    request: {
      query: recoverMutation,
      variables: { input: { email: 'logan.smith+error@gmail.com' } },
    },
    result: {
      data: {
        payload: {
          error: {
            id: 'b49e7dec-b1ad-495c-a853-d089816ed6bc',
            message: 'The user does not exist',
          },
        },
      },
    },
  },
  {
    delay: 5000,
    request: {
      query: recoverMutation,
      variables: { input: { email: 'logan.smith+loading@gmail.com' } },
    },
    result: { data: { payload: { error: null } } },
  },
]

storiesOf('Routes|Recover', module).add('Default', () => (
  <MockedProvider addTypename={false} mocks={mocks}>
    <Recover />
  </MockedProvider>
))
