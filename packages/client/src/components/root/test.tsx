import { MockedProvider } from '@apollo/react-testing'
import { waitForElement } from '@testing-library/react'
import React from 'react'

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
          emails: [
            {
              id: '5ec99e43-c24b-4104-a8d2-4b659109ae1f',
              value: 'demo@fintruth.com',
            },
          ],
          isTwoFactorAuthEnabled: false,
          profile: { familyName: 'User', givenName: 'Demo' },
        },
      },
    },
  },
]

const unauthenticatedMocks = [
  { request: { query: rootQuery }, result: { data: { user: null } } },
]

test('should render the error route correctly when authenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={authenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const errorElement = await waitForElement(() => getByTestId('error'))

  expect(errorElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the error route correctly when unauthenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={unauthenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const errorElement = await waitForElement(() => getByTestId('error'))

  expect(errorElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the home route correctly when authenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={authenticatedMocks}>
      <Root />
    </MockedProvider>
  )
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the home route correctly when unauthenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={unauthenticatedMocks}>
      <Root />
    </MockedProvider>
  )
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the recover route correctly when authenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={authenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/recover' }
  )
  const recoverElement = await waitForElement(() => getByTestId('recover'))

  expect(recoverElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the recover route correctly when unauthenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={unauthenticatedMocks}>
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

test('should render the default route correctly when authenticated', async () => {
  // @ts-ignore TS2588
  __DEV__ = false

  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={authenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
  expect(queryByTestId('error')).not.toBeInTheDocument()

  // @ts-ignore TS2588
  __DEV__ = true
})

test('should render the default route correctly when unauthenticated', async () => {
  // @ts-ignore TS2588
  __DEV__ = false

  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider addTypename={false} mocks={unauthenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
  expect(queryByTestId('error')).not.toBeInTheDocument()

  // @ts-ignore TS2588
  __DEV__ = true
})
