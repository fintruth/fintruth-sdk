import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { waitForElement } from 'react-testing-library'
import { renderWithRouter } from 'utilities/specification'
import Root from '.'

const createApolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.empty(),
  })

test('should render the home route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <Root data-testid="home" client={createApolloClient()} />
  )
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
  expect(queryByTitle('Page Not Found')).not.toBeInTheDocument()
})

test('should render the error route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <Root data-testid="error" client={createApolloClient()} />,
    { initialPath: '/error' }
  )
  const errorElement = await waitForElement(() => getByTestId('error'))

  expect(errorElement).toBeInTheDocument()
  expect(queryByTitle('Page Not Found')).not.toBeInTheDocument()
})

test('should render the recover route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <Root data-testid="recover" client={createApolloClient()} />,
    { initialPath: '/recover' }
  )
  const recoverElement = await waitForElement(() => getByTestId('recover'))

  expect(recoverElement).toBeInTheDocument()
  expect(queryByTitle('Page Not Found')).not.toBeInTheDocument()
})

test('should render the register route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <Root data-testid="register" client={createApolloClient()} />,
    { initialPath: '/register' }
  )
  const registerElement = await waitForElement(() => getByTestId('register'))

  expect(registerElement).toBeInTheDocument()
  expect(queryByTitle('Page Not Found')).not.toBeInTheDocument()
})

test('should render the sign-in route correctly', async () => {
  const { getByTestId, queryByTitle } = renderWithRouter(
    <Root data-testid="sign-in" client={createApolloClient()} />,
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
    <Root data-testid="error" client={createApolloClient()} />,
    { initialPath: '/error' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('error'))

  expect(notFoundElement).toHaveTextContent('Page Not Found')

  // @ts-ignore no-const-assign
  __DEV__ = true
})
