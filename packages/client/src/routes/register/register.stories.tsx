import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { storiesOf } from '@storybook/react'
import Register from '.'
import { registerMutation } from './graphql'

const defaultMocks = new Array(5).fill({
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
})

const delayMocks = new Array(5).fill({
  delay: 5000,
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
})

const errorMocks = new Array(5).fill({
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
