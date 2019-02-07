import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { waitForElement } from 'react-testing-library'

import Root from '.'
import { renderWithRouter } from 'utilities/specification'

test('should render the home route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <MockedProvider>
      <Root data-testid="home" />
    </MockedProvider>
  )
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
  expect(queryByTitle('Page Not Found')).not.toBeInTheDocument()
})

test('should render the error route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <MockedProvider>
      <Root data-testid="error" />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const errorElement = await waitForElement(() => getByTestId('error'))

  expect(errorElement).toBeInTheDocument()
  expect(queryByTitle('Page Not Found')).not.toBeInTheDocument()
})

test('should render the recover route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <MockedProvider>
      <Root data-testid="recover" />
    </MockedProvider>,
    { initialPath: '/recover' }
  )
  const recoverElement = await waitForElement(() => getByTestId('recover'))

  expect(recoverElement).toBeInTheDocument()
  expect(queryByTitle('Page Not Found')).not.toBeInTheDocument()
})

test('should render the register route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <MockedProvider>
      <Root data-testid="register" />
    </MockedProvider>,
    { initialPath: '/register' }
  )
  const registerElement = await waitForElement(() => getByTestId('register'))

  expect(registerElement).toBeInTheDocument()
  expect(queryByTitle('Page Not Found')).not.toBeInTheDocument()
})

test('should render the settings route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <MockedProvider>
      <Root data-testid="settings" />
    </MockedProvider>,
    { initialPath: '/settings' }
  )
  const settingsElement = await waitForElement(() => getByTestId('settings'))

  expect(settingsElement).toBeInTheDocument()
  expect(queryByTitle('Page Not Found')).not.toBeInTheDocument()
})

test('should render the sign-in route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <MockedProvider>
      <Root data-testid="sign-in" />
    </MockedProvider>,
    { initialPath: '/sign-in' }
  )
  const signInElement = await waitForElement(() => getByTestId('sign-in'))

  expect(signInElement).toBeInTheDocument()
  expect(queryByTitle('Page Not Found')).not.toBeInTheDocument()
})

test('should render the default route correctly', async () => {
  // @ts-ignore no-const-assign
  __DEV__ = false

  const { getByTestId } = renderWithRouter(
    <MockedProvider>
      <Root data-testid="error" />
    </MockedProvider>,
    { initialPath: '/error' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('error'))

  expect(notFoundElement).toHaveTextContent('Page Not Found')

  // @ts-ignore no-const-assign
  __DEV__ = true
})
