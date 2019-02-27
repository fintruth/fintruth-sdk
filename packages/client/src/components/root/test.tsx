import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { waitForElement } from 'react-testing-library'

import { renderWithRouter } from 'utilities/specification'
import { rootQuery } from './graphql'
import Root from '.'

jest.mock('@reach/utils')

const authenticatedMocks = [
  {
    request: { query: rootQuery },
    result: {
      data: {
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          email: 'demo@fintruth.com',
          isTwoFactorAuthEnabled: false,
          profile: { firstName: 'Demo', lastName: 'User' },
        },
      },
    },
  },
]

const unauthenticatedMocks = [
  { request: { query: rootQuery }, result: { data: { user: null } } },
]

test('should render the home route correctly', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider>
      <Root />
    </MockedProvider>
  )
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the error route correctly', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider>
      <Root />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const errorElement = await waitForElement(() => getByTestId('error'))

  expect(errorElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the recover route correctly', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider>
      <Root />
    </MockedProvider>,
    { initialPath: '/recover' }
  )
  const recoverElement = await waitForElement(() => getByTestId('recover'))

  expect(recoverElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the register route correctly when authenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={authenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/register' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
  expect(queryByTestId('register')).not.toBeInTheDocument()
})

test('should render the register route correctly when unauthenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={unauthenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/register' }
  )
  const registerElement = await waitForElement(() => getByTestId('register'))

  expect(registerElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the settings route correctly when authenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={authenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/settings' }
  )
  const settingsElement = await waitForElement(() => getByTestId('settings'))

  expect(settingsElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the settings route correctly when unauthenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={unauthenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/settings' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
  expect(queryByTestId('settings')).not.toBeInTheDocument()
})

test('should render the sign-in route correctly when authenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={authenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/sign-in' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
  expect(queryByTestId('sign-in')).not.toBeInTheDocument()
})

test('should render the sign-in route correctly when unauthenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={unauthenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/sign-in' }
  )
  const signInElement = await waitForElement(() => getByTestId('sign-in'))

  expect(signInElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the default route correctly', async () => {
  // @ts-ignore no-const-assign
  __DEV__ = false

  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider>
      <Root />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
  expect(queryByTestId('error')).not.toBeInTheDocument()

  // @ts-ignore no-const-assign
  __DEV__ = true
})
