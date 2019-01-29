import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { storiesOf } from '@storybook/react'
import Recover from '.'
import { recoverMutation } from './graphql'

const defaultMocks = new Array(5).fill({
  request: {
    query: recoverMutation,
    variables: { input: { email: 'logan.smith@gmail.com' } },
  },
  result: { data: { payload: { error: null } } },
})

const delayMocks = new Array(5).fill({
  delay: 5000,
  request: {
    query: recoverMutation,
    variables: { input: { email: 'logan.smith@gmail.com' } },
  },
  result: { data: { payload: { error: null } } },
})

const errorMocks = new Array(5).fill({
  request: {
    query: recoverMutation,
    variables: { input: { email: 'logan.smith@gmail.com' } },
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
})

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
