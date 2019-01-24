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
    result: { data: { payload: { error: null } } },
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
        payload: {
          error: {
            id: 'b4b61626-17d8-402b-b001-ad030d4b3589',
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
    result: { data: { payload: { error: null } } },
  },
]

storiesOf('Routes|Register', module).add('Default', () => (
  <MockedProvider addTypename={false} mocks={mocks}>
    <Register />
  </MockedProvider>
))
