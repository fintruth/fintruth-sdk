import React from 'react'
import { waitForElement } from 'react-testing-library'
import { renderWithRouter } from 'utilities/specification'
import Root from '.'

test('The Root component should render correctly', async () => {
  const { getByTestId } = renderWithRouter(<Root />)
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
})

test('The Root component should render the default route correctly', async () => {
  const { getByTestId } = renderWithRouter(<Root />, {
    initialPath: '/not-found',
  })
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
})
