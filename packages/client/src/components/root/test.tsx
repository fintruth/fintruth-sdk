import { MockedProvider } from '@apollo/react-testing'
import { waitForElement } from '@testing-library/react'
import React from 'react'

import { createFragmentMatcher, createInMemoryCache } from 'utilities/apollo'
import {
  emailBuilder,
  profileBuilder,
  renderWithRouter,
  userBuilder,
} from 'utilities/specification'
import { currentUserQuery } from './graphql'
import Root from '.'

jest.mock('@reach/utils')

const fragmentMatcher = createFragmentMatcher()

const userId = 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a'

const user = userBuilder({
  id: userId,
  emails: [emailBuilder({ isPrimary: true, userId })],
  profile: profileBuilder({ userId }),
})

const authenticatedMocks = [
  { request: { query: currentUserQuery }, result: { data: { user } } },
]

const unauthenticatedMocks = [
  { request: { query: currentUserQuery }, result: { data: { user: null } } },
]

test('should render the error route correctly when authenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={authenticatedMocks}
    >
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
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={unauthenticatedMocks}
    >
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
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={authenticatedMocks}
    >
      <Root />
    </MockedProvider>
  )
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the home route correctly when unauthenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={unauthenticatedMocks}
    >
      <Root />
    </MockedProvider>
  )
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the recover route correctly when authenticated', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={authenticatedMocks}
    >
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
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={unauthenticatedMocks}
    >
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
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={authenticatedMocks}
    >
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
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={unauthenticatedMocks}
    >
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
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={authenticatedMocks}
    >
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
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={unauthenticatedMocks}
    >
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
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={authenticatedMocks}
    >
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
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={unauthenticatedMocks}
    >
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
  __IS_DEV__ = false

  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={authenticatedMocks}
    >
      <Root />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
  expect(queryByTestId('error')).not.toBeInTheDocument()

  // @ts-ignore TS2588
  __IS_DEV__ = true
})

test('should render the default route correctly when unauthenticated', async () => {
  // @ts-ignore TS2588
  __IS_DEV__ = false

  const { getByTestId, queryByTestId } = renderWithRouter(
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={unauthenticatedMocks}
    >
      <Root />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
  expect(queryByTestId('error')).not.toBeInTheDocument()

  // @ts-ignore TS2588
  __IS_DEV__ = true
})
