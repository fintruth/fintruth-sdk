import { MockedProvider } from '@apollo/react-testing'
import { waitForElement } from '@testing-library/react'
import React from 'react'

import { createInMemoryCache } from 'utils/apollo'
import {
  emailBuilder,
  profileBuilder,
  renderWithContext,
  userBuilder,
} from 'utils/spec'
import { currentUserQuery } from './graphql'
import Root from '.'

jest.mock('@reach/utils')

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

test('should render the "/register" route correctly when authenticated', async () => {
  const { getByTestId } = renderWithContext(
    <MockedProvider cache={createInMemoryCache()} mocks={authenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/register' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
})

test('should render the "/settings" route correctly when unauthenticated', async () => {
  const { getByTestId } = renderWithContext(
    <MockedProvider cache={createInMemoryCache()} mocks={unauthenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/settings' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
})

test('should render the "/sign-in" route correctly when authenticated', async () => {
  const { getByTestId } = renderWithContext(
    <MockedProvider cache={createInMemoryCache()} mocks={authenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/sign-in' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
})

test('should render the default route correctly when authenticated', async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore TS2588
  __IS_DEV__ = false

  const { getByTestId } = renderWithContext(
    <MockedProvider cache={createInMemoryCache()} mocks={authenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore TS2588
  __IS_DEV__ = true
})

test('should render the default route correctly when unauthenticated', async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore TS2588
  __IS_DEV__ = false

  const { getByTestId } = renderWithContext(
    <MockedProvider cache={createInMemoryCache()} mocks={unauthenticatedMocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore TS2588
  __IS_DEV__ = true
})
