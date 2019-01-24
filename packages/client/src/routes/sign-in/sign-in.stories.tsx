import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { MockedResponse } from 'react-apollo/test-links'
import { storiesOf } from '@storybook/react'
import SignIn from '.'
import { signInMutation } from './graphql'

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: signInMutation,
      variables: {
        input: {
          email: 'logan.smith@gmail.com',
          password: 'Asdfg!2345',
        },
      },
    },
    result: {
      data: {
        payload: {
          error: null,
          user: {
            id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
            email: 'logan.smith@gmail.com',
            profile: { firstName: 'Logan', lastName: 'Smith' },
          },
        },
      },
    },
  },
  {
    request: {
      query: signInMutation,
      variables: {
        input: {
          email: 'logan.smith+error@gmail.com',
          password: 'Asdfg!2345',
        },
      },
    },
    result: {
      data: {
        payload: {
          error: {
            id: 'b49e7dec-b1ad-495c-a853-d089816ed6bc',
            message: 'Incorrect email or password',
          },
          user: null,
        },
      },
    },
  },
  {
    delay: 5000,
    request: {
      query: signInMutation,
      variables: {
        input: {
          email: 'logan.smith+loading@gmail.com',
          password: 'Asdfg!2345',
        },
      },
    },
    result: {
      data: {
        payload: {
          error: null,
          user: {
            id: '59d609bf-a041-43a6-9777-ac84b2046408',
            email: 'logan.smith+loading@gmail.com',
            profile: { firstName: 'Logan', lastName: 'Smith' },
          },
        },
      },
    },
  },
]

storiesOf('Routes|Sign In', module).add('Default', () => (
  <MockedProvider addTypename={false} mocks={mocks}>
    <SignIn />
  </MockedProvider>
))
