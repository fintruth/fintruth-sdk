import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { MockedResponse } from 'react-apollo/test-links'
import { storiesOf } from '@storybook/react'
import Register from '.'
import { registerMutation } from './graphql'

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: registerMutation,
      variables: {
        input: {
          email: 'logan.smith@gmail.com',
          emailConfirm: 'logan.smith@gmail.com',
          firstName: 'Logan',
          lastName: 'Smith',
          password: 'Asdfg!2345',
        },
      },
    },
    result: { data: { response: { error: null } } },
  },
  {
    request: {
      query: registerMutation,
      variables: {
        input: {
          email: 'logan.smith+error@gmail.com',
          emailConfirm: 'logan.smith+error@gmail.com',
          firstName: 'Logan',
          lastName: 'Smith',
          password: 'Asdfg!2345',
        },
      },
    },
    result: {
      data: {
        response: {
          error: {
            message: 'The user already exists',
          },
        },
      },
    },
  },
  {
    delay: 5000,
    request: {
      query: registerMutation,
      variables: {
        input: {
          email: 'logan.smith+loading@gmail.com',
          emailConfirm: 'logan.smith+loading@gmail.com',
          firstName: 'Logan',
          lastName: 'Smith',
          password: 'Asdfg!2345',
        },
      },
    },
    result: { data: { response: { error: null } } },
  },
]

storiesOf('Routes|Register', module).add('Default', () => (
  <MockedProvider addTypename={false} mocks={mocks}>
    <Register />
  </MockedProvider>
))
