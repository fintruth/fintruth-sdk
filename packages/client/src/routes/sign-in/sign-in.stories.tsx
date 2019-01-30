import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { storiesOf } from '@storybook/react'
import SignIn from '.'
import { signInMutation } from './graphql'

const defaultMocks = new Array(5).fill({
  request: {
    query: signInMutation,
    variables: {
      input: { email: 'logan.smith@gmail.com', password: 'Asdfg!2345' },
    },
  },
  result: {
    data: {
      response: {
        error: null,
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          email: 'logan.smith@gmail.com',
        },
      },
    },
  },
})

const delayMocks = new Array(5).fill({
  delay: 5000,
  request: {
    query: signInMutation,
    variables: {
      input: { email: 'logan.smith@gmail.com', password: 'Asdfg!2345' },
    },
  },
  result: {
    data: {
      response: {
        error: null,
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          email: 'logan.smith@gmail.com',
        },
      },
    },
  },
})

const errorMocks = new Array(5).fill({
  request: {
    query: signInMutation,
    variables: {
      input: { email: 'logan.smith@gmail.com', password: 'Asdfg!2345' },
    },
  },
  result: {
    data: {
      response: {
        error: {
          id: 'b49e7dec-b1ad-495c-a853-d089816ed6bc',
          message: 'Incorrect email or password',
        },
        user: null,
      },
    },
  },
})

storiesOf('Routes|Sign In', module)
  .add('Default', () => (
    <MockedProvider addTypename={false} mocks={defaultMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider addTypename={false} mocks={delayMocks}>
      <SignIn />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider addTypename={false} mocks={errorMocks}>
      <SignIn />
    </MockedProvider>
  ))
