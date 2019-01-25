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
  const { getByTestId, queryByTestId } = renderWithRouter(
    <Root client={createApolloClient()} />
  )
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the error route correctly', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <Root client={createApolloClient()} />,
    { initialPath: '/error' }
  )
  const errorElement = await waitForElement(() => getByTestId('error'))

  expect(errorElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the recover route correctly', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <Root client={createApolloClient()} />,
    { initialPath: '/recover' }
  )
  const recoverElement = await waitForElement(() => getByTestId('recover'))

  expect(recoverElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the register route correctly', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <Root client={createApolloClient()} />,
    { initialPath: '/register' }
  )
  const registerElement = await waitForElement(() => getByTestId('register'))

  expect(registerElement).toBeInTheDocument()
  expect(queryByTestId('not-found')).not.toBeInTheDocument()
})

test('should render the sign-in route correctly', async () => {
  const { getByTestId, queryByTestId } = renderWithRouter(
    <Root client={createApolloClient()} />,
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
    <Root client={createApolloClient()} />,
    { initialPath: '/error' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
  expect(queryByTestId('home')).not.toBeInTheDocument()

  // @ts-ignore no-const-assign
  __DEV__ = true
})
